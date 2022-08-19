<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { usePostsStore } from '@/state/posts'

const postsStores = usePostsStore()
const {
  list: posts,
  isLoading,
  searchList: searchResults,
} = storeToRefs(postsStores)

const showModal = ref(false)

const closeModalEvent = () => {
  showModal.value = false
}

const query = ref('')

let page = 1

const loadMore = () => {
  ++page
  postsStores.get(page)
}

const onPostClick = (id: number) => {
  navigateTo(`posts/${id}`)
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
    <div class="flex gap-2 items-center relative mb-4">
      <BaseInput :model-value="query" />
      <NuxtIcon
        name="times"
        class="cursor-pointer absolute text-black right-10"
      />
      <NuxtIcon name="gears" class="cursor-pointer" @click="showModal = true" />
    </div>
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200 transform"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      name="posts-list"
    >
      <div v-if="searchResults && query != '' && !isLoading" class="posts-list">
        <PostCard
          v-for="post in searchResults.results"
          :key="post.id"
          :post="post"
          @click="onPostClick(post.id)"
        />
      </div>
      <div v-else-if="!isLoading" class="posts-list">
        <PostCard
          v-for="post in posts"
          :key="post.id"
          class="transition-all"
          :post="post"
          @click="onPostClick(post.id)"
        />
      </div>
    </transition>

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
