import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import BaseCardError from '@/components/base/BaseCardError.vue'

describe('BaseCardError', () => {
	it('should render properly', () => {
		const { html } = render(BaseCardError)
		expect(html()).toMatchSnapshot()
	})
})
