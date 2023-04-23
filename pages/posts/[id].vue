<script lang="ts" setup>
import { usePostsStore } from '@/state/posts'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const postStore = usePostsStore()
const { currentPost: post } = storeToRefs(postStore)
const isLoading = ref(true)
if (route.params.id) {
	postStore.getById(+route.params.id.toString()).finally(() =>
		setTimeout(() => {
			isLoading.value = false
		}, 325)
	)
}
</script>

<template>
	<transition class="px-5 py-2">
		<NuxtIcon v-if="isLoading" class="spinner" name="spinner" />
		<div v-else-if="post && !isLoading" v-html="post.content.rendered"></div>
		<div v-else-if="!isLoading && !post">Not Found</div>
	</transition>
</template>

<style lang="scss">
img[src$='Trailer.png'],
a {
	display: none;
}
a[href^='magnet:?'] {
	display: inline-block;
	img {
		margin: 0 auto;
	}
}
</style>
