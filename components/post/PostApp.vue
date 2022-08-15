<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { usePostsStore } from '@/state/posts'

const postsStores = usePostsStore()
const { list: posts, isLoading } = storeToRefs(postsStores)

onBeforeMount(() => {
  if (!isLoading.value && (posts?.value?.length ?? 0) === 0) {
    postsStores.get()
  }
})
</script>

<template>
  <div class="posts-page self-start w-full px-5">
    <PostDomainFormApp />
    <div class="posts-list">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.posts-page {
  .posts-list {
    display: grid;
    gap: 10px;
  }
}
</style>
