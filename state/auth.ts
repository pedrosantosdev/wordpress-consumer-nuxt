import { defineStore, acceptHMRUpdate } from 'pinia'
import { AuthModel } from '@/types/User'
import { isNotEmpty } from '@/helpers/string'
import { useBaseFetch } from '@/composables/useBaseFetch'

type ResponseError = {
	data: string
	code: string
}

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
		async login(payload: FormData) {
			if (
				!isNotEmpty(payload.get('username') as string) ||
				!isNotEmpty(payload.get('password') as string)
			) {
				this.setError('Missing Fields', 'empty_fields')
				return
			}
			this.setError()
			const response = await useBaseFetch<Partial<ResponseError & ResponseAuth>>(`login`, {
				method: 'POST',
				body: payload,
				headers: {
					Accept: 'application/json',
				},
			})
			if (response.data && response.code) {
				this.setError(response.data, response.code)
				return
			}
			if (
				[response.accessToken, response.refreshToken, response.expires].every((value) =>
					isNotEmpty(value)
				)
			) {
				await this.$patch((state: AuthState) => {
					state.user = { name: payload.get('username') as string }
					state.token = response.accessToken ?? ''
					state.refreshToken = response.refreshToken ?? ''
					state.expiresAt = response.expires ?? ''
				})
			}
		},
		async logout(redirect = true) {
			await this.$reset()
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
	persist: {
		paths: ['token', 'expiresAt', 'refreshToken'],
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
