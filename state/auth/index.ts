import { defineStore, acceptHMRUpdate } from 'pinia'
import Cookies from 'js-cookie'
import state from './state'
import actions from './actions'
import getters from './getters'

const cookiesStorage: Storage = {
  setItem(_key, state) {
    return Cookies.set('token', state, { expires: 3 })
  },
  getItem(_key) {
    return JSON.stringify({
      token: Cookies.get('token'),
    })
  },
  length: 0,
  clear: function (): void {
    JSON.stringify({})
  },
  key: function (): string | null {
    throw new Error('Function not implemented.')
  },
  removeItem: function (): void {
    throw new Error('Function not implemented.')
  },
}

export const useAuthStore = defineStore('auth', {
  state,
  actions,
  getters,
  persist: {
    enabled: true,
    strategies: [
      {
        storage: cookiesStorage,
        paths: ['token'],
      },
    ],
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
