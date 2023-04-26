import { describe, it, expect, afterEach } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import BaseButtonVue from '@/components/base/BaseButton/BaseButton.vue'

const dataPropsRender = [
	{
		label: 'Icon and Disabled',
		props: {
			disabled: true,
			showIcon: true,
		},
	},
	{
		label: 'Icon and not Disabled',
		props: {
			disabled: false,
			showIcon: true,
		},
	},
	{
		label: 'Text and Disabled',
		props: {
			disabled: true,
			showIcon: false,
		},
	},
	{
		label: 'Text and not Disabled',
		props: {
			disabled: false,
			showIcon: false,
		},
	},
]
const defaultLabelSlot = 'Login'

describe('BaseButtonVue', () => {
	afterEach(() => {
		document.body.innerHTML = ''
	})
	describe.each(dataPropsRender)('should render properly', (data) => {
		it(data.label, () => {
			const { html }= render(BaseButtonVue, {
				props: data.props,
				slots: { default: defaultLabelSlot },
			})
			expect(html()).toMatchSnapshot()
		})
	})
	it(`should emit click properly when not disabled`, async () => {
		const { emitted, getByText } = render(BaseButtonVue, {
			slots: { default: defaultLabelSlot },
		})
		await fireEvent.click(getByText(defaultLabelSlot))
		expect(emitted().click).toBeTruthy()
		expect(emitted().click.length).toBe(1)
	})

	it(`should not emit click when disabled`, async () => {
		const { container, emitted } = render(BaseButtonVue, {
			props: { disabled: true },
			slots: { default: defaultLabelSlot },
		})
		await fireEvent.click(container)
		expect(emitted().click).toBeFalsy()
	})
})
