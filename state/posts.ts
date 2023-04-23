import { defineStore, acceptHMRUpdate } from 'pinia'
import { Post } from '@/types/Post'
import { Page } from '@/types/Page'

export interface StateModel {
	list: Post[]
	searchList: Page<Post> | null
	isLoadingSearch: boolean
	currentPost: Post | null
	isLoading: boolean
	hasError: boolean
}

const baseUri = 'posts'

export const usePostsStore = defineStore('posts', {
	state: (): StateModel => ({
		list: [],
		searchList: null,
		isLoading: false,
		hasError: false,
		currentPost: null,
		isLoadingSearch: false,
	}),
	actions: {
		async get(page = 1) {
			this.$patch((state) => {
				state.isLoading = true
				state.hasError = false
			})
			const res = await useBaseFetch<Post[]>(baseUri, {
				params: { page },
			})
			if (res && !res.error.value) {
				this.$state.list =
					page === 1 ? res.data.value ?? [] : this.$state.list.concat(res.data.value ?? [])
			} else {
				this.$state.hasError = !!res.error.value
			}
			this.$state.isLoading = res.pending.value
		},
		async search(query: string, page = 1) {
			this.$state.isLoadingSearch = true
			const res = await useBaseFetch<Post[]>(baseUri, {
				params: { search: query, page },
			})
			if (res && res.data.value) {
				this.$state.searchList = {
					page,
					results: res.data.value,
					total_pages: 1,
				}
			}
			this.$state.isLoadingSearch = res.pending.value
		},
		async getById(id: number) {
			const res = await useBaseFetch<Post>(`${baseUri}/${id}`)
			if (res && !res.error.value) {
				this.$state.currentPost = res.data.value
			}
		},
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(usePostsStore, import.meta.hot))
}
