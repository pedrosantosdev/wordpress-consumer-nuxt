import { beforeEach, describe, expect, test } from 'vitest'
import { useAuthStore } from './auth'
import { createPinia, setActivePinia } from 'pinia'

describe.concurrent('useAuthStore', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
	})
	describe('getters', () => {
		describe('isAuth', () => {
			test('should be false when token is empty', () => {
				const store = useAuthStore()
				store.$patch({ token: '' })
				expect(store.isAuth).toBeFalsy()
			})
			test('should be true when token is not empty', async () => {
				const store = useAuthStore()
				await store.$patch({ token: 'token.bacana' })
				expect(store.isAuth).toBeTruthy()
			})
		})
		describe('isExpired', () => {
			test.each([
				['expiresAt empty and refreshToken empty', { expiresAt: '', refreshToken: '' }],
				[
					'expiresAt empty and refreshToken not empty',
					{ expiresAt: '', refreshToken: 'refresh.token' },
				],
				[
					'expiresAt not empty and refreshToken empty',
					{ expiresAt: '2093-01-01T00:00:00', refreshToken: '' },
				],
				[
					'expiresAt not empty and refreshToken not empty and expiresAt is in pass',
					{ expiresAt: '2003-01-01T00:00:00', refreshToken: '' },
				],
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			])('should be true when %s', (_label: string, args: any) => {
				const store = useAuthStore()
				store.$patch(args)
				expect(store.isExpired).toBeTruthy()
			})
			test('should be false when expiresAt is in the future', () => {
				const store = useAuthStore()
				store.$patch({ expiresAt: '2090-01-01T00:00:00', refreshToken: 'token.bacana' })
				expect(store.isExpired).toBeFalsy()
			})
		})
		describe('hasError', () => {
			test('should be false when message and code empty', () => {
				const store = useAuthStore()
				store.$patch({ error: { message: '', code: '' } })
				expect(store.hasError).toBeFalsy()
			})
			test.each([
				['message not empty', { error: { message: 'error', code: '' } }],
				['message not empty', { error: { message: '', code: 'error_code' } }],
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			])('should be true when %s', (_label: string, args: any) => {
				const store = useAuthStore()
				store.$patch(args)
				expect(store.hasError).toBeTruthy()
			})
		})
	})
})
