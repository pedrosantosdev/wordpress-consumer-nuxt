import { useAuthStore } from '@/state/auth/auth'
import { useRuntimeConfig } from 'nuxt/app'

export const useBaseFetch = <T = unknown>(url: string, options = {}) => {
	const authStore = useAuthStore()
	const headers = { Accept: 'application/json', Authorization: '' }
	if (authStore.isAuth) {
		headers.Authorization = `Bearer ${authStore.token}`
	}
	return $fetch<T>(url, {
		headers,
		baseURL: useRuntimeConfig().baseUrl,
		...options,
		onResponseError: async (response) => {
			if (response.response.status == 401 && authStore.isAuth && url != 'login') {
				authStore.logout()
			}
		},
	})
}
