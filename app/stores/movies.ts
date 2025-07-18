import { defineStore, acceptHMRUpdate } from 'pinia'
import type { MovieLocalModel, MovieModel, MovieSearchModel } from '@/types/Movie'

export interface StateModel {
	list?: MovieModel[]
	isLoading: boolean
	hasError: boolean
	query: string
	queryResultList?: MovieModel[]
}

export const useMoviesStore = defineStore('movies', {
	state: (): StateModel => ({
		list: [],
		isLoading: false,
		hasError: false,
		query: '',
		queryResultList: [],
	}),
	getters: {
		getSearchMovies: (state: StateModel) =>
			state.queryResultList?.map((movie): MovieLocalModel => {
				const movieLocal = state.list?.find((movieFromList) => movieFromList.id === movie.id)
				if (movieLocal) {
					return {
						...movieLocal,
						alreadyAdd: true,
					}
				}
				return {
					...movie,
					alreadyAdd: false,
				}
			}),
	},
	actions: {
		async get() {
			this.$state.isLoading = true
			this.$state.hasError = false
			const res = await useBaseFetch<MovieModel[]>('movies')
			if (res && !res.error.value) {
				this.$state.list = res.data.value ?? []
			}
			this.$state.hasError = !!res.error.value
			this.$state.isLoading = res.pending.value
		},
		searchLocal(payload: Record<string, string | number | boolean>) {
			let filterList = this.$state.list ?? []
			if (payload.isActive) {
				filterList = filterList.filter((movie) => movie.needSync)
			}
			if (payload.isReady) {
				filterList = filterList.filter((movie) => movie.hasFile)
			}
			if ((payload.value as string).trim().length > 0) {
				this.$state.query = payload.value as string
				filterList = filterList.filter(
					(movie) => movie.title.toLowerCase().search(this.query.toLowerCase()) > -1,
				)
			}
			if (payload.recentMovies) {
				const dateStringToDate = (date: string): Date => {
					if (date === 'TBA') {
						return new Date(new Date().getFullYear() + 2)
					}
					return new Date(date)
				}

				filterList = filterList.sort(
					(a, b) =>
						dateStringToDate(b.inCinemas).getTime() - dateStringToDate(a.inCinemas).getTime(),
				)
			}
			this.$state.queryResultList = filterList
		},
		async search(payload: string) {
			if (payload === this.$state.query) {
				return
			}
			this.$state.query = payload
			if (payload.trim().length === 0) {
				this.$state.isLoading = false
				this.$state.hasError = false
				return
			}
			this.$state.isLoading = true
			this.$state.hasError = false
			const res = await useBaseFetch<MovieSearchModel>(
				'movies/info?query=' + encodeURIComponent(payload),
			)
			if (res && !res.error.value) {
				this.$state.queryResultList = res.data.value?.results ?? undefined
			}
			this.$state.hasError = !!res.error.value
			this.$state.isLoading = res.pending.value
		},
		async add(id: number) {
			const res = await useBaseFetch<MovieModel>(`movies/${id}`, { method: 'POST' })
			if (res && !res.error.value) {
				this.$state.list = { ...(this.$state.list ?? []), ...res.data.value }
			}
		},
		async toggle(payload: { id: number; needSync: boolean }) {
			await useBaseFetch(`movies/${payload.id}/sync`, {
				method: 'PUT',
				body: {
					need_sync: payload.needSync,
				},
			})
			this.$state.list = this.$state.list?.map((movie) => {
				if (movie.id === payload.id) {
					return { ...movie, needSync: payload.needSync }
				}
				return movie
			})
		},
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useMoviesStore, import.meta.hot))
}
