import { defineStore, acceptHMRUpdate } from 'pinia'
import type { Post } from '@/types/Post';
import type { Page } from '@/types/Page';

export interface StateModel {
	list: { page: number; results: Post[] }
	searchList: Page<Post> | null
	currentPost: Post | null
	loading: string[]
	hasError: boolean
}

const baseUri = 'posts'

export const usePostsStore = defineStore('posts', {
	state: (): StateModel => ({
		list: { page: 1, results: [] },
		searchList: null,
		hasError: false,
		currentPost: null,
		loading: [],
	}),
	getters: {
		isLoading: (state: StateModel) => state.loading.includes('get'),
		isLoadingSearch: (state: StateModel) => state.loading.includes('search'),
		isLoadingGetById: (state: StateModel) => state.loading.includes('getById'),
	},
	actions: {
		toggleLoadingFlag(flag: string, status = true) {
			if (status) {
				this.loading.push(flag)
				return
			}
			this.loading.splice(this.loading.indexOf(flag), 1)
		},
		async get(page = 1) {
			this.$patch((state) => {
				this.toggleLoadingFlag('get')
				state.hasError = false
			})
			const res = await useBaseFetch<Post[]>(baseUri, {
				params: { page },
			})
			if (res && !res.error.value) {
				this.$state.list = {
					page,
					results:
						page === 1
							? res.data.value ?? []
							: this.$state.list.results.concat(res.data.value ?? []),
				}
			} else {
				this.$state.hasError = !!res.error.value
			}
			this.toggleLoadingFlag('get', false)
		},
		async search(query: string, page = 1) {
			this.toggleLoadingFlag('search')
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
			this.toggleLoadingFlag('search', false)
		},
		async getById(id: number) {
			this.toggleLoadingFlag('getById')
			const res = await useBaseFetch<Post>(`${baseUri}/${id}`)
			if (res && !res.error.value) {
				this.$state.currentPost = res.data.value
			}
			this.toggleLoadingFlag('getById', false)
		},
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(usePostsStore, import.meta.hot))
}
