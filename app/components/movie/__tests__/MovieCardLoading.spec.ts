import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import MovieCardLoadingVue from '@/components/movie/MovieCardLoading.vue'

describe('MovieCardLoadingVue', () => {
	it('should render properly', () => {
		const { html } = render(MovieCardLoadingVue)
		expect(html()).toMatchSnapshot()
	})
})
