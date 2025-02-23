import { render, fireEvent } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import BaseEditableInput from '../BaseEditableInput.vue'

describe('BaseEditableInput', () => {
	const props = {
		isNew: false,
		checked: false,
		isInvalid: false,
		inputs: [{ id: 1, type: 'text', value: 'Test Value' }],
		draggableClass: 'draggable',
	}

	it('renders correctly', () => {
		const { getByLabelText } = render(BaseEditableInput, { props })

		expect(getByLabelText('Drag to reorder')).toBeTruthy()
		expect(getByLabelText('Toogle Edit Field')).toBeTruthy()
		expect(getByLabelText('Field options')).toBeTruthy()
	})

	it('toggles edit mode', async () => {
		const { getByLabelText } = render(BaseEditableInput, { props })
		const toggleButton = getByLabelText('Toogle Edit Field')

		await fireEvent.click(toggleButton)
		expect(toggleButton).toBeTruthy()
	})

	it('shows save button when editing', async () => {
		const { getByRole } = render(BaseEditableInput, { props: { ...props, isNew: true } })
		const saveButton = getByRole('button', { name: 'Save Field' })

		expect(saveButton).toBeTruthy()
	})

	it('emits save event', async () => {
		const { getByRole, emitted } = render(BaseEditableInput, { props: { ...props, isNew: true } })
		const saveButton = getByRole('button', { name: 'Save Field' })

		await fireEvent.click(saveButton)
		expect(emitted().save).toBeTruthy()
	})

	it('emits delete event', async () => {
		const { getByRole, getByText, emitted } = render(BaseEditableInput, { props })
		const optionsButton = getByRole('button', { name: 'Field options' })

		await fireEvent.click(optionsButton)
		const deleteButton = getByText('Delete')

		await fireEvent.click(deleteButton)
		expect(emitted().delete).toBeTruthy()
	})

	it('emits toggle event', async () => {
		const { getByRole, getByText, emitted } = render(BaseEditableInput, { props })
		const optionsButton = getByRole('button', { name: 'Field options' })

		await fireEvent.click(optionsButton)
		const toggleButton = getByText('Enable')

		await fireEvent.click(toggleButton)
		expect(emitted().toggle).toBeTruthy()
	})
})
