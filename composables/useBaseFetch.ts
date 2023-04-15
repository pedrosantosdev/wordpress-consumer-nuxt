import { useAuthStore } from '@/state/auth'
import { useRuntimeConfig } from 'nuxt/app'

export const useBaseFetch = async <T = unknown>(url: string, options = {}) => {
	const authStore = useAuthStore()
	const headers = { Accept: 'application/json', Authorization: '' }
	if (authStore.isAuth) {
		headers.Authorization = `Bearer ${authStore.token}`
	}
	const { data } = await useFetch(url, {
		headers,
		baseURL: useRuntimeConfig().baseUrl,
		...options,
		async onRequest({ request, options }) {
			if (authStore.isExpired && url != 'login' && url != 'refresh' && !authStore.onRequest) {
				const token = await authStore.refreshToken()
				if (!token) {
					authStore.logout(true)
				}
			}
		},
		onResponseError: async (response) => {
			if (response.response.status == 401 && authStore.isAuth && url != 'login') {
				authStore.logout()
			}
		},
	})
	return data.value as T
}
