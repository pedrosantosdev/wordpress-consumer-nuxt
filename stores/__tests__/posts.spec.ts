import { describe, expect, it, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePostsStore } from '../posts'

vi.mock('nuxt/app', () => ({
	useFetch: vi.fn().mockResolvedValue({ data: { value: [] }, error: { value: null }, pending: { value: false } }),
	useRuntimeConfig: vi.fn().mockReturnValue({ public: { baseUrl: 'http://localhost:8080' } }),
	navigateTo: vi.fn(),
}))

vi.mock('#app', () => ({
	navigateTo: vi.fn(),
}))

vi.mock('#imports', () => ({}))

describe('usePostsStore', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
	})

	it('should start with default state', () => {
		const store = usePostsStore()
		expect(store.list).toEqual({ page: 0, results: [], total_pages: 0 })
		expect(store.searchList).toBeNull()
		expect(store.currentPost).toBeNull()
		expect(store.loading).toEqual([])
		expect(store.hasError).toBe(false)
	})

	it('should have correct loading getters', () => {
		const store = usePostsStore()
		expect(store.isLoading).toBe(false)
		expect(store.isLoadingSearch).toBe(false)
		expect(store.isLoadingGetById).toBe(false)
	})

	it('should toggle loading flags', () => {
		const store = usePostsStore()
		store.toggleLoadingFlag('get')
		expect(store.loading).toContain('get')
		expect(store.isLoading).toBe(true)

		store.toggleLoadingFlag('get', false)
		expect(store.loading).not.toContain('get')
		expect(store.isLoading).toBe(false)
	})

	it('should toggle multiple loading flags independently', () => {
		const store = usePostsStore()
		store.toggleLoadingFlag('get')
		store.toggleLoadingFlag('search')
		expect(store.isLoading).toBe(true)
		expect(store.isLoadingSearch).toBe(true)

		store.toggleLoadingFlag('get', false)
		expect(store.isLoading).toBe(false)
		expect(store.isLoadingSearch).toBe(true)
	})
})
