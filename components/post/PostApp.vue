<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { usePostsStore } from '@/state/posts'
import { isNotEmpty } from '@/helpers/string'
import { ref, onBeforeMount } from 'vue'

const postsStores = usePostsStore()
const {
	list: posts,
	isLoading,
	searchList: searchResults,
	isLoadingSearch,
} = storeToRefs(postsStores)

const el: Ref<HTMLElement | null> = ref(null)
const showModal = ref(false)

function closeModalEvent() {
	showModal.value = false
}

const query = ref('')
function clearQuery() {
	query.value = ''
}
function submitQuery() {
	postsStores.search(query.value)
}

let page = 1

function loadMore() {
	if (
		isLoading.value ||
		isNotEmpty(query.value) ||
		(page > 1 && (posts.value.results.length ?? 0) < 10)
	) {
		return
	}
	page += 1
	postsStores.get(page)
}
function onPostClick(id: number) {
	navigateTo(`/posts/${id}`)
}

onBeforeMount(() => {
	page = posts.value.page
	if (!isLoading.value && (posts.value.results.length ?? 0) === 0) {
		postsStores.get()
	}
})
onMounted(() => {
	const { y } = useWindowScroll()
	watch(
		() => y.value,
		(newValue) => {
			if (el.value && window.innerHeight + newValue >= +(el.value.offsetHeight * 0.8).toFixed(1)) {
				loadMore()
			}
		}
	)
})
</script>

<template>
	<div class="posts-page self-start w-full px-5 pb-3">
		<BaseModal :show-modal="showModal" @close="closeModalEvent">
			<PostDomainForm class="-m-8 py-8 px-4" />
		</BaseModal>
		<div class="flex w-full gap-2 items-center relative mb-4">
			<BaseInput v-model="query" @enter="submitQuery" @debounce="submitQuery" />
			<NuxtIcon
				name="times"
				class="cursor-pointer absolute text-black right-10"
				@click="clearQuery"
			/>
			<NuxtIcon name="gears" class="cursor-pointer" @click="showModal = true" />
		</div>
		<transition name="posts-list">
			<div v-if="!isLoadingSearch && isNotEmpty(query)" class="posts-list">
				<PostCard
					v-for="post in searchResults?.results ?? []"
					:key="post.id"
					:post="post"
					@click="onPostClick(post.id)"
				/>
			</div>
			<div v-else-if="!isLoadingSearch && !isNotEmpty(query)" ref="el" class="posts-list">
				<PostCard
					v-for="post in posts.results"
					:key="post.id"
					:post="post"
					@click="onPostClick(post.id)"
				/>
			</div>
		</transition>

		<button
			v-show="!isLoading && !isNotEmpty(query)"
			class="w-2/4 mx-auto mt-4 text-center p-5 border border-black"
			@click="loadMore"
		>
			Ver Mais
		</button>
		<NuxtIcon
			v-show="isLoading || isLoadingSearch"
			class="w-2/4 mx-auto mt-4 spinner"
			name="spinner"
		/>
	</div>
</template>

<style lang="scss">
@use '@/assets/scss/abstract/_mixins.scss';
.posts-page {
	@apply flex justify-center items-center w-full flex-row flex-wrap;
	.posts-list {
		@apply w-full gap-5 justify-evenly;
		@include mixins.grid-auto-columns(24rem);
	}
}
</style>
