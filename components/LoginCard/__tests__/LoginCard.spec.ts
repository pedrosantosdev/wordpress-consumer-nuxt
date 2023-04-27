import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import LoginCard from '@/components/LoginCard/LoginCard.vue'
import { createTestingPinia } from '@pinia/testing'

describe('LoginCard', () => {
	const plugins = [createTestingPinia({ stubActions: false })]
	it('should render properly', () => {
		const { html } = render(LoginCard, {
			global: {
				plugins,
			},
		})
		expect(html()).toMatchSnapshot()
	})
})
