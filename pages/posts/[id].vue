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
  <transition>
    <NuxtIcon v-if="isLoading" class="spinner" name="spinner" />
    <div v-else-if="!isLoading && !post">Not Found</div>
    <div v-else-if="post" v-html="post.content.rendered"></div>
  </transition>
</template>
