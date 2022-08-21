<script lang="ts" setup>
import { usePostsStore } from '@/state/posts'
import { storeToRefs } from 'pinia'

const route = useRoute()
const postStore = usePostsStore()
const { currentPost: post } = storeToRefs(postStore)
let isLoading = true
if (route.params.id) {
  await postStore.getById(route.params.id)
}
isLoading = false
</script>

<template>
  <transition class="px-5 py-2">
    <NuxtIcon v-if="isLoading" class="spinner" name="spinner" />
    <div v-else-if="!isLoading && !post">Not Found</div>
    <div v-else-if="post" v-html="post.content.rendered"></div>
  </transition>
</template>

<style lang="scss">
img[src$='Trailer.png'],
a {
  display: none;
}
a[href^='magnet:?'] {
  display: block;
  img {
    margin: 0 auto;
  }
}
</style>
