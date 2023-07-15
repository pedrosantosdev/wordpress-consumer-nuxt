import { defineStore, acceptHMRUpdate } from 'pinia'
import { AuthModel } from '@/types/User'
import { isNotEmpty } from '@/helpers/string'
import { useBaseFetch } from '@/composables/useBaseFetch'
import { navigateTo } from '#app'

type ResponseAuth = {
	accessToken: string
	refreshToken: string
	expires: string
}

export type AuthState = {
	lastPage: string
	expiresAt: string | null
	error: {
		message: string | null
		code: string | null
	}
	onRequest: boolean
} & AuthModel

export const useAuthStore = defineStore({
	id: 'auth',
	state: (): AuthState => {
		return {
			lastPage: '/',
			token: null,
			refreshToken: null,
			expiresAt: null,
			user: null,
			onRequest: false,
			error: {
				message: null,
				code: null,
			},
		}
	},
	actions: {
		setError(message: string | null = null, code: string | null = null): void {
			this.$patch((state: AuthState) => {
				state.error = {
					message,
					code,
				}
			})
		},
		async setCredential(response: ResponseAuth) {
			if (
				[response.accessToken, response.refreshToken, response.expires].every((value) =>
					isNotEmpty(value)
				)
			) {
				await this.$patch((state: AuthState) => {
					state.token = response.accessToken ?? ''
					state.refreshToken = response.refreshToken ?? ''
					state.expiresAt = response.expires ?? ''
				})
			}
		},
		async login(payload: FormData) {
			if (
				!isNotEmpty(payload.get('username') as string) ||
				!isNotEmpty(payload.get('password') as string)
			) {
				this.setError('Missing Fields', 'empty_fields')
				return
			}
			this.setError()
			const response = await useBaseFetch<ResponseAuth>(`login`, {
				method: 'POST',
				body: payload,
				headers: {
					Accept: 'application/json',
				},
			})
			if (!response || response.error.value) {
				this.setError('Invalid Credentials', 'invalid_credentials')
				return
			}
			this.setCredential(response.data.value as ResponseAuth)
		},
		async refreshToken() {
			if (!this.$state.refreshToken || !this.$state.token) {
				return false
			}
			this.$state.onRequest = true
			const response = await useBaseFetch<ResponseAuth>(`refresh`, {
				method: 'POST',
				body: {
					access_token: this.$state.token,
					refresh_token: this.$state.refreshToken,
				},
				headers: {
					Accept: 'application/json',
				},
			})
			this.$state.onRequest = false
			if (!response || response.error.value) {
				this.setError('Invalid Credentials', 'invalid_credentials')
				return false
			}
			this.setCredential(response.data.value as ResponseAuth)
			return true
		},
		async logout(redirect = true) {
			await this.$reset()
			if (redirect) {
				return navigateTo('login')
			}
		},
	},
	getters: {
		hasError: (state: AuthState) => isNotEmpty(state.error.message) || isNotEmpty(state.error.code),
		isAuth: (state: AuthState) => isNotEmpty(state.token),
		isExpired: (state: AuthState) =>
			state.expiresAt && state.refreshToken
				? new Date(Date.parse(state.expiresAt)) < new Date()
				: true,
	},
	persist: {
		paths: ['token', 'expiresAt', 'refreshToken'],
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
