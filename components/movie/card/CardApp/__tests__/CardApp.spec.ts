import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import CardAppVue from '@/components/movie/card/CardApp/CardApp.vue'

describe('CardAppVue', () => {
	it('should render properly props else case', () => {
		const { html } = render(CardAppVue, {
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
		const { html } = render(CardAppVue, {
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
