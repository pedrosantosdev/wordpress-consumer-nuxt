import { defineStore, acceptHMRUpdate } from 'pinia'
import type { Post } from '@/types/Post'
import type { Page } from '@/types/Page'

export interface StateModel {
	list: Page<Post>
	searchList: Page<Post> | null
	currentPost: Post | null
	loading: string[]
	hasError: boolean
}

const baseUri = 'posts'

export const usePostsStore = defineStore('posts', {
	state: (): StateModel => ({
		list: { page: 0, results: [], total_pages: 0 },
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
					total_pages: 0,
					results:
						page === 1
							? (res.data.value ?? [])
							: this.$state.list.results.concat(res.data.value ?? []),
				}
			} else {
				this.$state.hasError = !!res.error.value
			}
			this.toggleLoadingFlag('get', false)
		},
		async search(query: string, page = 1) {
			this.toggleLoadingFlag('search')
			if (page === 1) {
				this.$state.searchList = null
			}
			const res = await useBaseFetch<Post[]>(baseUri, {
				params: { search: query, page },
			})
			if (res && res.data.value) {
				this.$state.searchList = {
					page,
					results:
						this.$state.searchList == null
							? (res.data.value ?? [])
							: this.$state.searchList.results.concat(res.data.value ?? []),
					total_pages: 1,
				}
			}
			this.toggleLoadingFlag('search', false)
		},
		async getById(id: number, domainId?: number, useCache = false) {
			this.toggleLoadingFlag('getById')
			if (useCache) {
				const result = this.$state.list.results.find(
					(searchItem) =>
						searchItem.id == id && (domainId == null || searchItem.domain_id == domainId),
				)
				if (result != null) {
					this.$state.currentPost = result
					this.toggleLoadingFlag('getById', false)
					return
				}
			}
			const res = await useBaseFetch<Post>(`${baseUri}/${id}`, { params: { domain_id: domainId } })
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
