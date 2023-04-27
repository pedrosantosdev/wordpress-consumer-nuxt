import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import BaseModalVue from '@/components/base/BaseModal/BaseModal.vue'

describe('BaseModalVue', () => {
	it('should render properly', () => {
		const { html } = render(BaseModalVue, {
			props: {
				showModal: true,
			},
		})
		expect(html()).toMatchSnapshot()
	})
})
