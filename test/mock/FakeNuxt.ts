import { vi } from 'vitest'

const nuxtMock = {
	navigateTo: vi.fn(),
	useRuntimeConfig: vi.fn(),
	useFetch: vi.fn(),
	persistedState: {
		localStorage: vi.fn(),
		sessionStorage: vi.fn(),
		cookies: vi.fn(),
		cookiesWithOptions: vi.fn(),
	},
}

vi.mock('nuxt/app', () => {
	return nuxtMock
})

vi.mock('#app', () => {
	return nuxtMock
})

vi.mock('#imports', () => {
	return nuxtMock
})
