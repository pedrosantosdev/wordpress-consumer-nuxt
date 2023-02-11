import { useBaseFetch } from '@/composables/usBaseFetch'

const actions = {
	async get() {
		this.isLoading = true
		this.hasError = false
		await useBaseFetch('movies')
			.then((res) => {
				if (res != undefined && (typeof res === 'array' || typeof res === 'object')) {
					this.list = res
				} else {
					this.hasError = true
				}
			})
			.catch(() => {
				this.hasError = true
			})
			.finally(() => {
				this.isLoading = false
			})
	},
	searchLocal(payload) {
		let filterList = this.list
		if (payload.isActive) {
			filterList = filterList.filter((movie) => movie.needSync)
		}
		if (payload.isReady) {
			filterList = filterList.filter((movie) => movie.hasFile)
		}
		if (payload.value.trim().length > 0) {
			this.query = payload.value
			filterList = filterList.filter(
				(movie) => movie.title.toLowerCase().search(this.query.toLowerCase()) > -1
			)
		}
		this.queryResultList = filterList
	},
	async search(payload) {
		if (payload === this.query) {
			return
		}
		this.query = payload
		if (payload.trim().length === 0) {
			this.isLoading = false
			this.hasError = false
			return
		}
		this.isLoading = true
		this.hasError = false
		await useBaseFetch('movies/info?query=' + encodeURIComponent(payload))
			.then((res) => {
				if (
					res &&
					res.results &&
					(typeof res.results === 'array' || typeof res.results === 'object')
				) {
					this.queryResultList = res.results
				} else {
					this.hasError = true
				}
			})
			.catch(() => {
				this.hasError = true
			})
			.finally(() => {
				this.isLoading = false
			})
	},
	async add(payload) {
		await useBaseFetch(`movies/${payload}`, { method: 'POST' }).then((res) => {
			this.list = { ...this.list, ...res }
		})
	},
	async toggle(payload) {
		await useBaseFetch(`movies/${payload.id}/sync`, {
			method: 'PUT',
			body: {
				need_sync: payload.needSync,
			},
		}).then(() => {
			this.list = this.list.map((movie) => {
				if (movie.id === payload.id) {
					return { ...movie, needSync: payload.needSync }
				}
				return movie
			})
		})
	},
}

export default actions
