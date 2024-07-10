<script lang="ts" setup>
import useIsSeriesLink from '@/composables/useIsSeriesLink'
import { usePostsStore } from '@/state/posts'
import { useToastStore } from '@/state/toast'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
	id: number
	domainId?: number
}>()

const postStore = usePostsStore()
const { currentPost: post } = storeToRefs(postStore)
await postStore.getById(props.id, props.domainId, true)

let textToCopy = reactive<string[]>([])
const el = ref<HTMLDivElement | null>(null)
const listening = ref(false)
const linkCount = ref(0)
const rabbit = ref(false)
const multipleSelectActive = ref(false)
const { copy } = useClipboard({ legacy: true })
const isValidLink = ref(true)

watchEffect(() => {
	if (el.value && !listening.value) {
		listening.value = true
		const magnetLinks = el.value.querySelectorAll('a[href^="magnet:?"]')
		if (magnetLinks.length === 0) {
			el.value.innerHTML = ''
			isValidLink.value = false

			return
		}
		magnetLinks.forEach((elLink) => {
			elLink.addEventListener('click', (e) => {
				e.preventDefault()
				e.stopPropagation()
				e.stopImmediatePropagation()
				overrideLinkMagnet((e.currentTarget as HTMLLinkElement).href)
			})
		})
	}
})
async function overrideLinkMagnet(text?: string): Promise<void> {
	if (text && textToCopy.findIndex((value) => value.trim() === text.trim()) === -1) {
		textToCopy.push(text)
		linkCount.value += 1
	}
	if (text && multipleSelectActive.value) return
	if (linkCount.value === 0) {
		useToastStore().showToast(t('post.details.link.error.empty'), { status: 'error' })
		return
	}
	let message = t('post.details.link.copy')
	const readyText = textToCopy.join('\n')
	if (rabbit.value) {
		await useBaseFetch('movies/heap', {
			method: 'POST',
			body: {
				link: readyText,
				type: useIsSeriesLink(readyText) ? 'series' : 'movies',
			},
		})
		message = t('post.details.link.enqueue')
	} else {
		copy(readyText)
	}
	linkCount.value = 0
	useToastStore().showToast(message)
	textToCopy = []
}
</script>

<template>
	<div class="px-5 py-2 post-page">
		<div v-show="post" class="selection-list">
			<div
				class="icon-item cursor-pointer"
				:class="{ 'dark:bg-gray-400 bg-gray-500': multipleSelectActive }"
			>
				<span v-show="multipleSelectActive" class="badge">{{ linkCount }}</span>
				<NuxtIcon name="list" @click.prevent="multipleSelectActive = !multipleSelectActive" />
			</div>
			<div class="icon-item cursor-pointer">
				<NuxtIcon name="check" @click.prevent="overrideLinkMagnet()" />
			</div>
			<div class="icon-item cursor-pointer" :class="{ 'dark:bg-gray-400 bg-gray-500': rabbit }">
				<NuxtIcon name="rabbitmq-icon" @click.prevent="rabbit = !rabbit" />
			</div>
		</div>
		<transition>
			<div v-if="post" ref="el" v-html="post.content"></div>
			<div v-else>{{ t('not_found') }}</div>
		</transition>
		<div v-if="post && !isValidLink">Invalid post - {{ post.link ?? post.domain_id }}</div>
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

<i18n lang="json">
{
	"en": {
		"post.details.link.error.empty": "Select at least one link",
		"post.details.link.copy": "Copied Link",
		"post.details.link.enqueue": "Enqueued Link"
	},
	"pt-BR": {
		"post.details.link.error.empty": "Selecione pelo menos um link",
		"post.details.link.copy": "Link Copiado",
		"post.details.link.enqueue": "Link enfileirado"
	}
}
</i18n>
