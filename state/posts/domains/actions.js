import { useBaseFetch } from '@/composables/useBaseFetch'
const baseUri = 'post-domain'
const actions = {
	async get() {
		this.$state.isLoading = true
		this.$state.hasError = false
		const res = await useBaseFetch(baseUri)
		if (res != undefined && (typeof res === 'array' || typeof res === 'object')) {
			this.$state.list = res
		} else {
			this.$state.hasError = true
		}
		this.$state.isLoading = false
	},
	async add(payload) {
		return useBaseFetch(baseUri, { method: 'POST', body: payload })
	},
	async update(payload) {
		return useBaseFetch(baseUri, {
			method: 'PUT',
			body: payload,
		}).then(() => {
			this.list = this.list.map((item) => {
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
	async delete(payload) {
		return useBaseFetch(`${baseUri}/${payload}`, { method: 'DELETE' }).then(() => {
			this.$state.list = this.list.filter((item) => item.id !== payload)
		})
	},
}

export default actions
