import { useAuthStore } from '~~/state/auth'

export const useBaseFetch = (url: string, options = {}) => {
  const token = useAuthStore().token
  const headers = { Accept: 'application/json', Authorization: '' }
  if (token && token != '') {
    headers.Authorization = `Bearer ${token}`
  }
  return $fetch(`${useRuntimeConfig().baseUrl}/${url}`, {
    headers,
    ...options,
  })
}
