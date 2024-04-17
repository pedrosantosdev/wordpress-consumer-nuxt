import { describe, it, expect, beforeEach } from 'vitest'
import { render } from '@testing-library/vue'
import BaseSwitchToggleVue from '@/components/base/BaseSwitchToggle.vue'

describe('BaseSwitchToggleVue', () => {
	beforeEach(() => {
		document.body.innerHTML = ''
	})
	it('should render properly without default state', () => {
		const { html } = render(BaseSwitchToggleVue, {
			props: {
				id: 'toggle',
			},
		})
		expect(html()).toMatchSnapshot()
	})
	it('should render properly with default state', () => {
		const { html } = render(BaseSwitchToggleVue, {
			props: {
				id: 'toggle',
				defaultState: true,
			},
		})
		expect(html()).toMatchSnapshot()
	})
	it('should emit toggle when click', async () => {
		const { container, emitted } = render(BaseSwitchToggleVue, {
			props: {
				id: 'toggle',
			},
		})
		const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement
		input.click()
		expect(emitted('toggle')).toBeTruthy()
		expect(emitted('toggle').length).toBe(1)
		expect(emitted('toggle').values().next().value[0]).toBeTruthy()
	})
})
