import { render } from '@testing-library/vue'
import CardLoadingVue from '@/components/movie/card/CardLoading/CardLoading.vue'

describe('CardLoadingVue', () => {
	it('should render properly', () => {
		const wrapper = render(CardLoadingVue)
		expect(wrapper.html()).toMatchSnapshot()
	})
})
