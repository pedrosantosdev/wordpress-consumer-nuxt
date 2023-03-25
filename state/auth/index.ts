import { defineStore, acceptHMRUpdate } from 'pinia'
import { AuthModel } from '@/types/User'
import { isNotEmpty } from '@/helpers/string'
import { useBaseFetch } from '@/composables/usBaseFetch'

export interface AuthState extends AuthModel {
	lastPage: string
	isLoading: boolean
	expiresAt: string | null
	error: {
		message: string | null
		code: string | null
	}
}

export const useAuthStore = defineStore('auth', {
	state: (): AuthState => {
		return {
			lastPage: '/',
			token: null,
			refreshToken: null,
			expiresAt: null,
			user: null,
			isLoading: false,
			error: {
				message: null,
				code: null,
			},
		}
	},
	actions: {
		login(payload: FormData) {
			if (this.isLoading) {
				return
			} else if (
				!isNotEmpty(payload.get('username') as string) ||
				!isNotEmpty(payload.get('password') as string)
			) {
				this.error = {
					message: 'Missing Fields',
					code: 'empty_fields',
				}
				return
			}
			this.isLoading = true
			this.error = {
				message: null,
				code: null,
			}
			useBaseFetch(`login`, {
				method: 'POST',
				body: payload,
				headers: {
					Accept: 'application/json',
				},
			})
				.then((response: { accessToken: string; refreshToken: string; expires: string }) => {
					if (
						[response.accessToken, response.refreshToken, response.expires].every((value) =>
							isNotEmpty(value)
						)
					) {
						this.$patch({
							user: { name: payload.get('username') as string },
							token: response.accessToken,
							refreshToken: response.refreshToken,
							expiresAt: response.expires,
						})
					}
				})
				.catch(
					(response) =>
						(this.error = {
							message: response.data,
							code: response.code,
						})
				)
				.finally(() => (this.isLoading = false))
		},
		async logout(redirect = true) {
			this.user = null
			this.token = null
			this.refreshToken = null
			this.expiresAt = null
			this.isLoading = false
			this.error = {
				message: null,
				code: null,
			}
			if (redirect) {
				navigateTo('login')
			}
		},
	},
	getters: {
		hasError: (state: AuthState) => isNotEmpty(state.error.message) || isNotEmpty(state.error.code),
		isAuth: (state: AuthState) => isNotEmpty(state.token),
		isExpired: (state: AuthState) =>
			state.expiresAt ? new Date(Date.parse(state.expiresAt)) < new Date() : false,
	},
	persist: true,
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
