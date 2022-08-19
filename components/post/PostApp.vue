<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { usePostsStore } from '@/state/posts'

const postsStores = usePostsStore()
const { list: posts, isLoading } = storeToRefs(postsStores)

const showModal = ref(false)

const closeModalEvent = () => {
  showModal.value = false
}

let page = 1

const loadMore = () => {
  ++page
  postsStores.get(page)
}

const onPostClick = (id: number) => {
  navigateTo(id.toString())
}

onBeforeMount(() => {
  if (!isLoading.value && (posts?.value?.length ?? 0) === 0) {
    postsStores.get()
  }
})
</script>

<template>
  <div class="posts-page self-start w-full px-5">
    <BaseModal :show-modal="showModal" @close="closeModalEvent">
      <PostDomainFormApp />
    </BaseModal>
    <div>
      <BaseInput />
      <NuxtIcon name="times" class="cursor-pointer dark:text-white mb-2" />
      <NuxtIcon
        name="gears"
        class="cursor-pointer dark:text-white mb-2"
        @click="showModal = true"
      />
    </div>
    <transition-group class="posts-list" name="posts-list" tag="div">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        class="transition-all"
        :post="post"
        @click="onPostClick(post.id)"
      />
    </transition-group>
    <button
      v-show="!isLoading"
      class="w-2/4 mx-auto mt-4 text-center p-5 border border-black"
      @click="loadMore"
    >
      Ver Mais
    </button>
    <NuxtIcon
      v-show="isLoading"
      class="w-2/4 mx-auto mt-4 spinner"
      name="spinner"
    />
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/abstract/mixins.scss';
.posts-page {
  .posts-list {
    gap: 10px;
    @include grid-auto-columns(24rem);
  }
}
</style>
