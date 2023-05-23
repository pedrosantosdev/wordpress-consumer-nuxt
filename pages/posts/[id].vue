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
let textToCopy = reactive<string[]>([])
const el = ref<HTMLDivElement | null>(null)
const listening = ref(false)
const linkCount = ref(0)
const multipleSelectActive = ref(false)
const { copy } = useClipboard({ legacy: true })
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
	if (text && textToCopy.findIndex((value) => value.trim() === text.trim()) === -1) {
		textToCopy.push(text)
		linkCount.value += multipleSelectActive.value ? 1 : 0
	}
	if (!text || !multipleSelectActive.value) {
		if (textToCopy.length > 0) {
			copy(textToCopy.join('\n'))
			linkCount.value = 0
			useToastStore().showToast('Link Copiado')
			textToCopy = []
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
				<span v-show="multipleSelectActive" class="badge">{{ linkCount }}</span>
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
		min-width: 80px;
		height: 56px;
		@apply flex justify-center items-center gap-3 fixed top-0 right-0 z-10 p-3;
		.icon-item {
			border-radius: 25%;
			@apply relative p-3;
			.badge {
				font-size: 10px;
				border-radius: 50%;
				@apply right-0.5 bottom-1 absolute bg-red-400 py-0.5 px-1.5;
			}
		}
	}
}
</style>
