import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import BaseCardVue from '@/components/base/BaseCard.vue'

describe('BaseCardVue', () => {
	it('should render properly', () => {
		const { html } = render(BaseCardVue)
		expect(html()).toMatchSnapshot()
	})
})
