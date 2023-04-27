import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import CardDefaultVue from '@/components/base/CardDefault/CardDefault.vue'

describe('CardDefaultVue', () => {
	it('should render properly', () => {
		const { html } = render(CardDefaultVue)
		expect(html()).toMatchSnapshot()
	})
})
