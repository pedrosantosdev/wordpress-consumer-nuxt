import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import CardErrorVue from '@/components/base/CardError/CardError.vue'

describe('CardErrorVue', () => {
	it('should render properly', () => {
		const { html }= render(CardErrorVue)
		expect(html()).toMatchSnapshot()
	})
})
