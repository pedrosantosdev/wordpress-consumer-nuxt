import { defineStore, acceptHMRUpdate } from 'pinia'
import state from './state'
import actions from './actions'

export const usePostsStore = defineStore('posts', {
  state,
  actions,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePostsStore, import.meta.hot))
}
