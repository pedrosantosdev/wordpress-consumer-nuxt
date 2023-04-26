import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import CardLoadingVue from '@/components/movie/card/CardLoading/CardLoading.vue'

describe('CardLoadingVue', () => {
	it('should render properly', () => {
		const { html }= render(CardLoadingVue)
		expect(html()).toMatchSnapshot()
	})
})
