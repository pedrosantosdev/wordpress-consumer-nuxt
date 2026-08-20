import { describe, expect, it, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMoviesStore } from '../movies'

vi.mock('nuxt/app', () => ({
	useFetch: vi.fn().mockResolvedValue({ data: { value: [] }, error: { value: null }, pending: { value: false } }),
	useRuntimeConfig: vi.fn().mockReturnValue({ public: { baseUrl: 'http://localhost:8080' } }),
	navigateTo: vi.fn(),
}))

vi.mock('#app', () => ({
	navigateTo: vi.fn(),
}))

vi.mock('#imports', () => ({}))

describe('useMoviesStore', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
	})

	it('should start with default state', () => {
		const store = useMoviesStore()
		expect(store.list).toEqual([])
		expect(store.isLoading).toBe(false)
		expect(store.hasError).toBe(false)
		expect(store.query).toBe('')
		expect(store.queryResultList).toEqual([])
	})

	it('should filter movies locally by text', () => {
		const store = useMoviesStore()
		store.$patch({
			list: [
				{ id: 1, title: 'The Matrix', overview: '', image: '', inCinemas: '1999-03-31', hasFile: true, needSync: false },
				{ id: 2, title: 'Inception', overview: '', image: '', inCinemas: '2010-07-16', hasFile: false, needSync: true },
			],
		})
		store.searchLocal({ value: 'Matrix', isActive: false, isReady: false, recentMovies: false })
		expect(store.queryResultList).toHaveLength(1)
		expect(store.queryResultList![0].title).toBe('The Matrix')
	})

	it('should filter movies locally by active (needSync)', () => {
		const store = useMoviesStore()
		store.$patch({
			list: [
				{ id: 1, title: 'Movie A', overview: '', image: '', inCinemas: '2020-01-01', hasFile: true, needSync: false },
				{ id: 2, title: 'Movie B', overview: '', image: '', inCinemas: '2021-01-01', hasFile: false, needSync: true },
			],
		})
		store.searchLocal({ value: '', isActive: true, isReady: false, recentMovies: false })
		expect(store.queryResultList).toHaveLength(1)
		expect(store.queryResultList![0].id).toBe(2)
	})

	it('should filter movies locally by ready (hasFile)', () => {
		const store = useMoviesStore()
		store.$patch({
			list: [
				{ id: 1, title: 'Movie A', overview: '', image: '', inCinemas: '2020-01-01', hasFile: true, needSync: false },
				{ id: 2, title: 'Movie B', overview: '', image: '', inCinemas: '2021-01-01', hasFile: false, needSync: true },
			],
		})
		store.searchLocal({ value: '', isActive: false, isReady: true, recentMovies: false })
		expect(store.queryResultList).toHaveLength(1)
		expect(store.queryResultList![0].id).toBe(1)
	})

	it('should sort movies by recent when recentMovies is true', () => {
		const store = useMoviesStore()
		store.$patch({
			list: [
				{ id: 1, title: 'Old Movie', overview: '', image: '', inCinemas: '2000-01-01', hasFile: true, needSync: false },
				{ id: 2, title: 'New Movie', overview: '', image: '', inCinemas: '2024-01-01', hasFile: true, needSync: false },
			],
		})
		store.searchLocal({ value: '', isActive: false, isReady: false, recentMovies: true })
		expect(store.queryResultList![0].title).toBe('New Movie')
		expect(store.queryResultList![1].title).toBe('Old Movie')
	})

	it('should mark search results with alreadyAdd flag', () => {
		const store = useMoviesStore()
		store.$patch({
			list: [
				{ id: 1, title: 'Movie A', overview: '', image: '', inCinemas: '2020-01-01', hasFile: true, needSync: false },
			],
			queryResultList: [
				{ id: 1, title: 'Movie A', overview: '', image: '', inCinemas: '2020-01-01', hasFile: true, needSync: false },
				{ id: 2, title: 'Movie B', overview: '', image: '', inCinemas: '2021-01-01', hasFile: false, needSync: false },
			],
		})
		const searchMovies = store.getSearchMovies
		expect(searchMovies).toHaveLength(2)
		expect(searchMovies![0].alreadyAdd).toBe(true)
		expect(searchMovies![1].alreadyAdd).toBe(false)
	})

	it('should clear state when searching empty string after a previous search', async () => {
		const store = useMoviesStore()
		store.$patch({ query: 'previous', isLoading: true, hasError: true })
		await store.search('')
		expect(store.isLoading).toBe(false)
		expect(store.hasError).toBe(false)
	})
})
