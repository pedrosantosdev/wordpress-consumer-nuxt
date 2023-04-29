import { vi } from 'vitest'

vi.mock('nuxt/app', () => {
	return {
		useRuntimeConfig: vi.fn(),
		useFetch: vi.fn(),
		persistedState: {
			cookiesWithOptions: vi.fn(),
		},
	}
})
