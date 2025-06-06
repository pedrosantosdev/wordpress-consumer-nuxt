import { useAuthStore } from '@/state/auth'
import { useRuntimeConfig, useFetch } from 'nuxt/app'
import type { Ref } from 'vue'

type FetchResponse<DataT, ErrorT> = {
	data: Ref<DataT | null>
	pending: Ref<boolean>
	error: Ref<ErrorT | null>
}

export async function useBaseFetch<T = unknown, K = unknown>(
	url: string,
	options = {},
): Promise<FetchResponse<T, K>> {
	const authStore = useAuthStore()
	const headers = { Accept: 'application/json', Authorization: '' }
	if (authStore.isAuth) {
		headers.Authorization = `Bearer ${authStore.token}`
	}
	const response = await useFetch<T, K>(url, {
		headers,
		baseURL: useRuntimeConfig().public.baseUrl,
		...options,
		async onRequest({ options }) {
			if (authStore.isExpired && url != 'login' && url != 'refresh' && !authStore.onRequest) {
				const token = await authStore.credentialRefreshToken()
				if (!token) {
					authStore.logout()
					return
				}
				options.headers = {
					...options.headers,
					Authorization: `Bearer ${authStore.token}`,
				}
			}
		},
		onResponseError({ response }) {
			if (response.status == 401 && authStore.isAuth && url != 'login' && url != 'refresh') {
				authStore.logout()
			}
		},
	})
	return response as FetchResponse<T, K>
}
