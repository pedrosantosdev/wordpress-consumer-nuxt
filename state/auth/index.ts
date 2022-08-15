import { defineStore, acceptHMRUpdate } from 'pinia'
import state from './state'
import actions from './actions'
import getters from './getters'

export const useAuthStore = defineStore('auth', {
  state,
  actions,
  getters,
  persist: {
    paths: ['token', 'refreshToken', 'expiresAt'],
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
