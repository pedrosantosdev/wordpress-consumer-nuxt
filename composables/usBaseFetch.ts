import { useAuthStore } from '@/state/auth'

export const useBaseFetch = (url: string, options = {}) => {
  const authStore = useAuthStore()
  const headers = { Accept: 'application/json', Authorization: '' }
  if (authStore.isAuth) {
    headers.Authorization = `Bearer ${authStore.token}`
  }
  return $fetch(`${useRuntimeConfig().baseUrl}/${url}`, {
    headers,
    ...options,
    onResponseError: async (response) => {
      if (
        response.response.status == 401 &&
        authStore.isAuth &&
        url != 'login'
      ) {
        authStore.logout()
      }
    },
  })
}
