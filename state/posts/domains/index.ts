import { defineStore, acceptHMRUpdate } from 'pinia'

import type { PostDomain } from '@/types/Post'
const baseUri = 'post-domain'
export interface StateModel {
	list?: PostDomain[]
	isLoading: boolean
	hasError: boolean
}

export const usePostDomainsStore = defineStore('post-domains', {
	state: (): StateModel => ({
		list: [],
		isLoading: false,
		hasError: false,
	}),
	actions: {
		async get() {
			this.$state.isLoading = true
			this.$state.hasError = false
			const res = await useBaseFetch<PostDomain[]>(baseUri)
			if (res && !res.error.value) {
				this.$state.list = res.data.value ?? undefined
			}
			this.$state.hasError = !!res.error.value
			this.$state.isLoading = res.pending.value
		},
		async add(payload: PostDomain) {
			return useBaseFetch(baseUri, { method: 'POST', body: payload })
		},
		async update(payload: PostDomain) {
			return useBaseFetch(baseUri, {
				method: 'PUT',
				body: payload,
			}).then(() => {
				this.list = this.$state.list?.map((item) => {
					if (item.id === payload.id) {
						return { ...item, ...payload }
					}
					return item
				})
			})
		},
		async updateHealth() {
			return useBaseFetch(`${baseUri}/health`)
		},
		async delete(id: number) {
			return useBaseFetch(`${baseUri}/${id}`, { method: 'DELETE' }).then(() => {
				this.$state.list = this.$state.list?.filter((item) => item.id !== id)
			})
		},
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(usePostDomainsStore, import.meta.hot))
}
