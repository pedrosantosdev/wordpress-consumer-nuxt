import { render } from '@testing-library/vue'
import BaseModalVue from '@/components/base/BaseModal/BaseModal.vue'

describe('BaseModalVue', () => {
	it('should render properly', () => {
		const wrapper = render(BaseModalVue, {
			props: {
				showModal: true,
			},
		})
		expect(wrapper.html()).toMatchSnapshot()
	})
})
