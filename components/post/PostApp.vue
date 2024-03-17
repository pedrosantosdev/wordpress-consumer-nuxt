<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { usePostsStore } from '@/state/posts'
import { isNotEmpty } from '@/helpers/string'
import { ref, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const postsStores = usePostsStore()
const {
	list: posts,
	isLoading,
	searchList: searchResults,
	isLoadingSearch,
} = storeToRefs(postsStores)

const el: Ref<HTMLElement | null> = ref(null)
const showModal = ref(false)

const query = ref('')
let lastQuery = ''
const PER_PAGE = 10

function submitQuery() {
	setTimeout(() => {
		waitForShowList.value = false
	}, 200)
	if (query.value === lastQuery) {
		return
	}
	lastQuery = query.value
	postsStores.search(query.value)
}

const searchEnabled = computed(() => isNotEmpty(query.value))

const postData = computed(() =>
	searchEnabled.value ? searchResults.value?.results ?? [] : posts.value?.results ?? [],
)
const currentPage = computed(() =>
	searchEnabled.value ? searchResults.value?.page ?? 1 : posts.value?.page ?? 1,
)
const isAnyLoading = computed(() => (searchEnabled.value ? isLoadingSearch.value : isLoading.value))

const hasMore = computed(
	() => (postData.value?.length ?? 0) > 0 && (postData.value?.length ?? 0) % PER_PAGE === 0,
)

const waitForShowList = ref(false)

function loadMore() {
	if (isAnyLoading.value || (currentPage.value > 1 && !hasMore.value)) {
		return
	}
	if (searchEnabled.value) {
		postsStores.search(query.value, currentPage.value + 1)
		return
	}
	postsStores.get(currentPage.value + 1)
}

onBeforeMount(() => {
	if (posts.value.results.length > 0) {
		return
	}
	loadMore()
})
onMounted(() => {
	const { y } = useWindowScroll()
	watch(
		() => y.value,
		(newValue) => {
			if (el.value && window.innerHeight + newValue >= +(el.value.offsetHeight * 0.8).toFixed(1)) {
				loadMore()
			}
		},
	)
})
</script>

<template>
	<div class="posts-page self-start w-full px-5 pb-3">
		<BaseModal :show-modal="showModal" @close="showModal = false">
			<PostDomainForm class="-m-8 py-8 px-4" />
		</BaseModal>
		<div class="flex w-full gap-2 items-center relative mb-4">
			<BaseInput
				v-model="query"
				@keyup="waitForShowList = true"
				@enter="submitQuery"
				@debounce="submitQuery"
			/>
			<NuxtIcon
				name="times"
				class="cursor-pointer absolute text-black right-10"
				@click="query = ''"
			/>
			<NuxtIcon name="gears" class="cursor-pointer" @click="showModal = true" />
		</div>
		<transition name="posts-list">
			<div v-if="!waitForShowList && postData.length > 0" ref="el" class="posts-list">
				<NuxtLink
					v-for="post in postData"
					:key="post.id"
					:to="'/posts/' + [post.id, post.domain_id].filter(Boolean).join('/')"
				>
					<PostCard :key="post.id" :post="post" />
				</NuxtLink>
			</div>
		</transition>

		<NuxtIcon v-if="isAnyLoading" class="w-2/4 mx-auto mt-4 spinner" name="spinner" />
		<button
			v-else-if="hasMore && !waitForShowList"
			class="w-2/4 mx-auto mt-4 text-center p-5 border border-black"
			@click="loadMore"
		>
			{{ t('load-more') }}
		</button>
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
