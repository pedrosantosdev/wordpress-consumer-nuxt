<script lang="ts" setup>
import { usePostsStore } from '@/state/posts'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

definePageMeta({
	validate: async (route) => {
		// Check if the id is made up of digits
		return /^\d+$/.test(route.params.id)
	},
})

const route = useRoute()
const postStore = usePostsStore()
const { currentPost: post } = storeToRefs(postStore)
const isLoading = ref(true)
const textToCopy = ref('')
const el = ref<HTMLDivElement | null>(null)
const listening = ref(false)
const multipleSelectActive = ref(false)
const { copy } = useClipboard({ source: textToCopy, legacy: true })
if (route.params.id) {
	postStore.getById(+route.params.id.toString()).finally(() =>
		setTimeout(() => {
			isLoading.value = false
		}, 325)
	)
}
watchEffect(() => {
	if (el.value && !listening.value) {
		listening.value = true
		document.body.querySelectorAll('a[href^="magnet:?"]').forEach((elLink) => {
			elLink.addEventListener('click', (e) => {
				e.preventDefault()
				e.stopPropagation()
				e.stopImmediatePropagation()
				copyTextToClipboard((e.currentTarget as HTMLLinkElement).href)
			})
		})
	}
})
function copyTextToClipboard(text?: string): void {
	textToCopy.value += text
	textToCopy.value += multipleSelectActive.value ? '\n' : ''
	if (!text || !multipleSelectActive.value) {
		copy(textToCopy.value)
		textToCopy.value = ''
	}
}
</script>

<template>
	<div class="px-5 py-2">
		<NuxtIcon v-show="isLoading" class="spinner" name="spinner" />
		<transition>
			<div v-if="post && !isLoading" ref="el" v-html="post.content.rendered"></div>
			<div v-else-if="!isLoading && !post">Not Found</div>
		</transition>
	</div>
</template>

<style lang="scss" scoped>
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
