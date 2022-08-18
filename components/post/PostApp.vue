<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { usePostsStore } from '@/state/posts'

const postsStores = usePostsStore()
const { list: posts, isLoading } = storeToRefs(postsStores)

const showModal = ref(false)
const closeModalEvent = () => {
  showModal.value = false
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
    <NuxtIcon
      name="gears"
      class="cursor-pointer text-white mb-2"
      @click="showModal = true"
    />
    <div class="posts-list">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
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
