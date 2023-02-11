import { render } from '@testing-library/vue'
import CardDefaultVue from '@/components/base/CardDefault/CardDefault.vue'

describe('CardDefaultVue', () => {
	it('should render properly', () => {
		const wrapper = render(CardDefaultVue)
		expect(wrapper.html()).toMatchSnapshot()
	})
})
