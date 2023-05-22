<script lang="ts" setup>
import { isNotEmpty } from '@/helpers/string'
import { usePostsStore } from '@/state/posts'
import { useToastStore } from '@/state/toast'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

definePageMeta({
	validate: async (route) => {
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
	textToCopy.value += text ?? ''
	textToCopy.value += multipleSelectActive.value ? '\n' : ''
	if (!text || !multipleSelectActive.value) {
		if (isNotEmpty(textToCopy.value.trim())) {
			copy(textToCopy.value)
			useToastStore().showToast('Link Copiado')
			textToCopy.value = ''
			return
		}
		useToastStore().showToast('Selecione pelo menos um link.', { status: 'error' })
	}
}
</script>

<template>
	<div class="px-5 py-2 post-page">
		<NuxtIcon v-show="isLoading" class="spinner" name="spinner" />
		<div v-show="post && !isLoading" class="selection-list">
			<div
				class="icon-item cursor-pointer"
				:class="{ 'dark:bg-gray-400 bg-gray-500': multipleSelectActive }"
			>
				<NuxtIcon name="list" @click.prevent="multipleSelectActive = !multipleSelectActive" />
			</div>
			<div class="icon-item cursor-pointer">
				<NuxtIcon name="check" @click.prevent="copyTextToClipboard()" />
			</div>
		</div>
		<transition>
			<div v-if="post && !isLoading" ref="el" v-html="post.content.rendered"></div>
			<div v-else-if="!isLoading && !post">Not Found</div>
		</transition>
	</div>
</template>

<style lang="scss">
.post-page {
	img[src$='Trailer.png'],
	a[href^='http'] {
		display: none;
	}
	.selection-list {
		width: 80px;
		height: 56px;
		@apply flex justify-center items-center gap-3 fixed top-0 right-0 z-10 p-3;
	}
}
</style>
