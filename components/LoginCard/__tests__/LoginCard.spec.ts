import { describe, it, expect, vi, afterEach } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import LoginCard from '@/components/LoginCard/LoginCard.vue'
import { createTestingPinia } from '@pinia/testing'
import { useAuthStore } from '@/stores/auth'
import type { StateTree } from 'pinia'
import nuxtMock from '@/test/mock/FakeNuxt'

const createPiniaSut = (state: StateTree | undefined = undefined) =>
	createTestingPinia({ stubActions: false, initialState: state })
describe('LoginCard', () => {
	afterEach(() => {
		vi.resetAllMocks()
	})
	let initialState = undefined
	it('should render properly', () => {
		const { html } = render(LoginCard, {
			global: {
				stubs: {
					NuxtIcon: true,
				},
				plugins: [createPiniaSut()],
			},
		})
		expect(html()).toMatchSnapshot()
	})
	it('should call logout when isAuth and Expired', () => {
		initialState = {
			auth: {
				token: 'token',
				refreshToken: 'refreshToken',
				expiresAt: '2020-01-01 10:00:00',
			},
		}
		render(LoginCard, {
			global: {
				stubs: {
					NuxtIcon: true,
				},
				plugins: [createPiniaSut(initialState)],
			},
		})
		const authStore = useAuthStore()
		expect(authStore.logout).toBeCalledTimes(1)
		expect(authStore.isAuth).toBeFalsy()
	})
	it('should redirect when isAuth and not Expired', () => {
		initialState = {
			auth: {
				token: 'token',
				refreshToken: 'refreshToken',
				expiresAt: '2050-01-01T10:00:00',
			},
		}
		render(LoginCard, {
			global: {
				stubs: {
					NuxtIcon: true,
				},
				plugins: [createPiniaSut(initialState)],
			},
		})
		const authStore = useAuthStore()
		expect(authStore.logout).not.toBeCalled()
		expect(authStore.isAuth).toBeTruthy()
		expect(nuxtMock.navigateTo).toBeCalledTimes(1)
	})
	it('should redirect when subscribe isAuth', async () => {
		render(LoginCard, {
			global: {
				stubs: {
					NuxtIcon: true,
				},
				plugins: [createPiniaSut()],
			},
		})
		const authStore = useAuthStore()
		await authStore.$patch((state) => (state.token = 'token'))
		expect(authStore.logout).not.toBeCalled()
		expect(authStore.isAuth).toBeTruthy()
		expect(nuxtMock.navigateTo).toBeCalledTimes(1)
	})
	it('should call login action when click button form', async () => {
		const { getByText } = render(LoginCard, {
			global: {
				stubs: {
					NuxtIcon: true,
				},
				plugins: [createPiniaSut()],
			},
		})
		const authStore = useAuthStore()
		await fireEvent.click(getByText('form.submit.button'))
		expect(authStore.login).toBeCalledTimes(1)
	})
	it('should configure credential inputs for password managers and length limits', () => {
		const { container } = render(LoginCard, {
			global: {
				stubs: {
					NuxtIcon: true,
				},
				plugins: [createPiniaSut()],
			},
		})
		const form = container.querySelector('form')
		const username = container.querySelector('#username')
		const password = container.querySelector('#password')
		expect(form?.getAttribute('autocomplete')).toBeNull()
		expect(username?.getAttribute('autocomplete')).toBe('username')
		expect(username?.getAttribute('maxlength')).toBe('254')
		expect(password?.getAttribute('autocomplete')).toBe('current-password')
		expect(password?.getAttribute('maxlength')).toBe('1024')
	})
	it('should filter unsafe characters from the username input', async () => {
		const { container } = render(LoginCard, {
			global: {
				stubs: {
					NuxtIcon: true,
				},
				plugins: [createPiniaSut()],
			},
		})
		const username = container.querySelector('#username') as HTMLInputElement

		await fireEvent.update(username, '<script>alert("x")</script>')

		expect(username.value).toBe('scriptalert(x)/script')
	})
	it('should not submit while the login is locked', async () => {
		initialState = {
			auth: {
				failedLoginAttempts: 5,
				loginLockedUntil: Date.now() + 60_000,
				error: { message: 'Too Many Login Attempts', code: 'too_many_attempts' },
			},
		}
		const { container } = render(LoginCard, {
			global: {
				stubs: {
					NuxtIcon: true,
				},
				plugins: [createPiniaSut(initialState)],
			},
		})
		const authStore = useAuthStore()
		const loginSpy = vi.spyOn(authStore, 'login')

		await fireEvent.submit(container.querySelector('form') as HTMLFormElement)

		expect(loginSpy).not.toHaveBeenCalled()
	})
})
