import { describe, it, expect, beforeEach } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import SwitchToggleVue from '@/components/base/SwitchToggle/SwitchToggle.vue'

describe('SwitchToggleVue', () => {
	beforeEach(() => {
		document.body.innerHTML = ''
	})
	it('should render properly without default state', () => {
		const { html } = render(SwitchToggleVue, {
			props: {
				id: 'toggle',
			},
		})
		expect(html()).toMatchSnapshot()
	})
	it('should render properly with default state', () => {
		const { html } = render(SwitchToggleVue, {
			props: {
				id: 'toggle',
				defaultState: true,
			},
		})
		expect(html()).toMatchSnapshot()
	})
	it('should emit toggle when click', async () => {
		const { container, emitted } = render(SwitchToggleVue, {
			props: {
				id: 'toggle',
			},
		})
		const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement
		await fireEvent.click(input)
		expect(emitted().toggle).toBeTruthy()
		expect(emitted().toggle.length).toBe(1)
		expect(emitted().toggle.values().next().value).toBeTruthy()
	})
})
