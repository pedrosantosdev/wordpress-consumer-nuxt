import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import MovieCardVue from '@/components/movie/MovieCard.vue'

describe('MovieCardVue', () => {
	it('should render properly props else case', () => {
		const { html } = render(MovieCardVue, {
			global: {
				stubs: {
					NuxtIcon: true,
				},
			},
			props: {
				movie: {
					id: 'id',
					title: 'title',
					overview: 'overview',
					image: null,
					inCinemas: 'TBA',
					hasFile: false,
					needSync: false,
				},
			},
		})
		expect(html()).toMatchSnapshot()
	})
	it('should render properly props if case', () => {
		const { html } = render(MovieCardVue, {
			global: {
				stubs: {
					NuxtIcon: true,
				},
			},
			props: {
				movie: {
					id: 'id',
					title: 'title',
					overview: 'overview',
					image: 'data:image/gif;base64,R0lGODdhAQABAPAAAP8AAAAAACwAAAAAAQABAAACAkQBADs=',
					inCinemas: '01-01-2022',
					hasFile: true,
					needSync: true,
				},
			},
		})
		expect(html()).toMatchSnapshot()
	})
})
