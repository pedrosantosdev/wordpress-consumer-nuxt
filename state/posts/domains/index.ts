import { defineStore, acceptHMRUpdate } from 'pinia'
import state from './state'
import actions from './actions'

export const usePostDomainsStore = defineStore('post-domains', {
  state,
  actions,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePostDomainsStore, import.meta.hot))
}
