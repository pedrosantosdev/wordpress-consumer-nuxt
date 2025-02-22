import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import BaseEditableInput from '../BaseEditableInput.vue'

describe('BaseEditableInput.vue', () => {
	const props = {
		isNew: false,
		checked: false,
		isInvalid: false,
		inputs: [
			{ id: 1, type: 'text', value: 'Test' }
		],
		draggableClass: 'draggable'
	}

	it('renders correctly', () => {
		const wrapper = render(BaseEditableInput, { props })
		expect(wrapper.container).toBeTruthy()
	})

	it('emits save event on save button click', async () => {
		const wrapper = render(BaseEditableInput, { props: { ...props, isNew: true } })
		await wrapper.getByRole('button', { name: /check/i }).click()
		expect(wrapper.emitted().save).toBeTruthy()
	})

	it('emits delete event on delete button click', async () => {
		const wrapper = render(BaseEditableInput, { props })
		await wrapper.getByRole('button', { name: /times/i }).click()
		expect(wrapper.emitted().delete).toBeTruthy()
	})

	it('emits toggle event on toggle button click', async () => {
		const wrapper = render(BaseEditableInput, { props })
		await wrapper.getByRole('button', { name: /list/i }).click()
		await wrapper.getByRole('button', { name: /toggle/i }).click()
		expect(wrapper.emitted().toggle).toBeTruthy()
	})

	it('renders draggable class when provided', () => {
		const wrapper = render(BaseEditableInput, { props })
		expect(wrapper.container.querySelector('.draggable')).toBeTruthy()
	})

	it('applies invalid class when isInvalid is true', () => {
		const wrapper = render(BaseEditableInput, { props: { ...props, isInvalid: true } })
		expect(wrapper.container.querySelector('.editable-input')?.classList).toContain('bg-red-300')
	})
})