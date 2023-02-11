import { render } from '@testing-library/vue'
import SwitchToggleVue from '@/components/base/SwitchToggle/SwitchToggle.vue'

describe('SwitchToggleVue', () => {
	it('should render properly', () => {
		const value = false
		const wrapper = render(SwitchToggleVue, {
			props: {
				id: 'toggle',
				onToggleSwitch: () => value != value,
			},
		})
		expect(wrapper.html()).toMatchSnapshot()
	})
})
