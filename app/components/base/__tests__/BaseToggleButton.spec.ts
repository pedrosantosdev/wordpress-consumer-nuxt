import { describe, it, expect, beforeEach } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import BaseToggleButtonVue from '@/components/base/BaseToggleButton.vue'

describe('BaseToggleButtonVue', () => {
	beforeEach(() => {
		document.body.innerHTML = ''
	})
	it.each([true, false])('should render properly', (modelValue) => {
		const { html } = render(BaseToggleButtonVue, {
			global: {
				stubs: {
					NuxtIcon: true,
				},
			},
			props: {
				modelValue,
				label: 'Filtro',
			},
		})
		expect(html()).toMatchSnapshot()
	})
	it('should emit toggle when click', async () => {
		const { container, emitted } = render(BaseToggleButtonVue, {
			global: {
				stubs: {
					NuxtIcon: true,
				},
			},
			props: {
				modelValue: false,
				label: 'Filtro',
			},
		})
		const button = container.querySelector('button') as HTMLButtonElement
		await fireEvent.click(button)
		expect(emitted()['update:modelValue']).toBeTruthy()
		expect(emitted()['update:modelValue'].length).toBe(1)
		expect(emitted()['update:modelValue'].values().next().value[0]).toBeTruthy()
	})
})
