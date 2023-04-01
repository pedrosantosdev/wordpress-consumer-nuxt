import { useBaseFetch } from '@/composables/usBaseFetch'
const baseUri = 'posts'
const actions = {
	async get(page = 1) {
		this.$patch((state) => {
			state.isLoading = true
			state.hasError = false
		})
		const res = await useBaseFetch(baseUri, {
			params: { page },
		})
		if (res != undefined && (typeof res === 'array' || typeof res === 'object')) {
			this.list = page === 1 ? res : this.list.concat(res)
		} else {
			this.hasError = true
		}
		this.isLoading = false
	},
	async search(query, page = 1) {
		this.isLoadingSearch = true
		const res = await useBaseFetch(baseUri, {
			params: { search: query, page },
		})
		if (res != undefined && (typeof res === 'array' || typeof res === 'object')) {
			const formatted = {
				page,
				results: page === 1 ? res : this.searchList.results.push(...res),
				total_pages: 1,
			}
			this.searchList = formatted
		}
		this.isLoadingSearch = false
	},
	async getById(id) {
		const res = await useBaseFetch(`${baseUri}/${id}`)
		if (res != undefined && typeof res === 'object') {
			this.currentPost = res
		}
	},
}

export default actions
