import { defineStore, acceptHMRUpdate } from 'pinia'
import state from './state'
import actions from './actions'

export const useMoviesStore = defineStore('movies', {
  state,
  actions,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMoviesStore, import.meta.hot))
}
