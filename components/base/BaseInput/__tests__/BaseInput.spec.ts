import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import BaseInputVue from '@/components/base/BaseInput/BaseInput.vue'

describe('BaseInputVue', () => {
	it('should render properly', () => {
		const { html } = render(BaseInputVue, {
			props: {
				label: 'Type Here',
				modelValue: '',
			},
		})
		expect(html()).toMatchSnapshot()
	})
})
