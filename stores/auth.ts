import { defineStore, acceptHMRUpdate } from 'pinia'
import type { AuthModel } from '@/types/User'
import { isNotEmpty, sanitizePassword, sanitizeUsername } from '@/helpers/string'
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
	failedLoginAttempts: number
	loginLockedUntil: number | null
} & AuthModel

export const MAX_LOGIN_ATTEMPTS = 5
export const LOGIN_LOCKOUT_MS = 30_000
export const MAX_LOGIN_LOCKOUT_MS = 15 * 60_000

const refreshLocks = new WeakMap<object, Promise<boolean>>()

export const useAuthStore = defineStore('auth', {
	state: (): AuthState => {
		return {
			lastPage: '/',
			token: null,
			refreshToken: null,
			expiresAt: null,
			user: null,
			onRequest: false,
			failedLoginAttempts: 0,
			loginLockedUntil: null,
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
		async setCredential(response: ResponseAuth): Promise<boolean> {
			if (
				[response.accessToken, response.refreshToken, response.expires].every((value) =>
					isNotEmpty(value),
				)
			) {
				await this.$patch((state: AuthState) => {
					state.token = response.accessToken ?? ''
					state.refreshToken = response.refreshToken ?? ''
					state.expiresAt = response.expires ?? ''
				})
				return true
			}
			return false
		},
		registerLoginFailure(): void {
			this.failedLoginAttempts += 1
			if (this.failedLoginAttempts >= MAX_LOGIN_ATTEMPTS) {
				const overflow = this.failedLoginAttempts - MAX_LOGIN_ATTEMPTS
				const lockoutMs = Math.min(
					LOGIN_LOCKOUT_MS * 2 ** overflow,
					MAX_LOGIN_LOCKOUT_MS,
				)
				this.loginLockedUntil = Date.now() + lockoutMs
				this.setError('Too Many Login Attempts', 'too_many_attempts')
				return
			}
			this.setError('Invalid Credentials', 'invalid_credentials')
		},
		resetLoginAttempts(): void {
			this.failedLoginAttempts = 0
			this.loginLockedUntil = null
		},
		async login(payload: FormData) {
			if (this.loginLockedUntil !== null && this.loginLockedUntil <= Date.now()) {
				this.loginLockedUntil = null
			}
			if (this.isLoginLocked) {
				this.setError('Too Many Login Attempts', 'too_many_attempts')
				return
			}
			const username = sanitizeUsername((payload.get('username') as string) ?? '')
			const password = sanitizePassword((payload.get('password') as string) ?? '')
			payload.set('username', username)
			payload.set('password', password)
			if (!isNotEmpty(username) || !isNotEmpty(password)) {
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
				this.registerLoginFailure()
				return
			}
			if (await this.setCredential(response.data.value as ResponseAuth)) {
				refreshLocks.delete(this)
				this.resetLoginAttempts()
			} else {
				this.setError('Invalid Credentials', 'invalid_credentials')
			}
		},
		async credentialRefreshToken(): Promise<boolean> {
			if (!this.$state.refreshToken || !this.$state.token) {
				return false
			}

			const inFlight = refreshLocks.get(this)
			if (inFlight) {
				return inFlight
			}
			if (!this.isExpired) {
				return true
			}

			let refreshed = false
			const refresh = (async () => {
				this.$state.onRequest = true
				try {
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
					if (!response || response.error.value) {
						this.setError('Invalid Credentials', 'invalid_credentials')
						return false
					}
					refreshed = await this.setCredential(response.data.value as ResponseAuth)
					if (!refreshed) {
						this.setError('Invalid Credentials', 'invalid_credentials')
					}
					return refreshed
				} finally {
					this.$state.onRequest = false
					if (refreshed) {
						refreshLocks.delete(this)
					}
				}
			})()

			refreshLocks.set(this, refresh)
			return refresh
		},
		async logout(redirect = true) {
			await this.$reset()
			refreshLocks.delete(this)
			if (redirect) {
				return navigateTo('login')
			}
		},
	},
	getters: {
		hasError: (state: AuthState) => isNotEmpty(state.error.message) || isNotEmpty(state.error.code),
		isAuth: (state: AuthState) => isNotEmpty(state.token),
		isLoginLocked: (state: AuthState) =>
			state.loginLockedUntil !== null && state.loginLockedUntil > Date.now(),
		loginLockoutRemainingMs: (state: AuthState) =>
			Math.max(0, (state.loginLockedUntil ?? 0) - Date.now()),
		isExpired: (state: AuthState) =>
			!isNotEmpty(state.expiresAt) ||
			!isNotEmpty(state.refreshToken) ||
			Date.parse(state.expiresAt) < new Date().getTime(),
	},
	persist: {
		paths: ['token', 'expiresAt', 'refreshToken'],
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
