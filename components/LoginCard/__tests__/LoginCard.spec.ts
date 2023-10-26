import { describe, it, expect, vi, afterEach } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import LoginCard from '@/components/LoginCard/LoginCard.vue'
import { createTestingPinia } from '@pinia/testing'
import { useAuthStore } from '@/state/auth'
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
		await fireEvent.click(getByText('Login'))
		expect(authStore.login).toBeCalledTimes(1)
	})
})
