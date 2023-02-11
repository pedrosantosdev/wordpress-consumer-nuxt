import { defineStore, acceptHMRUpdate } from 'pinia'
import state from './state'
import actions from './actions'
import getters from './getters'

export const useMoviesStore = defineStore('movies', {
	state,
	getters,
	actions,
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useMoviesStore, import.meta.hot))
}
