import { describe, expect, it, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useToastStore } from '../toast'

describe('useToastStore', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
	})

	it('should start with empty list', () => {
		const store = useToastStore()
		expect(store.list).toEqual([])
		expect(store.toastToShow).toBeNull()
	})

	it('should add toast to list', () => {
		const store = useToastStore()
		store.showToast('Test message')
		expect(store.list).toHaveLength(1)
		expect(store.toastToShow?.message).toBe('Test message')
		expect(store.toastToShow?.status).toBe('default')
	})

	it('should add toast with custom options', () => {
		const store = useToastStore()
		store.showToast('Error occurred', { status: 'error', timeout: 5000 })
		expect(store.list[0]).toEqual({
			message: 'Error occurred',
			status: 'error',
			timeout: 5000,
		})
	})

	it('should return first toast as toastToShow', () => {
		const store = useToastStore()
		store.showToast('First')
		store.showToast('Second')
		expect(store.toastToShow?.message).toBe('First')
	})

	it('should remove toast by index', () => {
		const store = useToastStore()
		store.showToast('First')
		store.showToast('Second')
		store.removeToast(0)
		expect(store.list).toHaveLength(1)
		expect(store.toastToShow?.message).toBe('Second')
	})

	it('should handle removing from empty list', () => {
		const store = useToastStore()
		store.removeToast(0)
		expect(store.list).toHaveLength(0)
		expect(store.toastToShow).toBeNull()
	})

	it('should support multiple status types', () => {
		const store = useToastStore()
		store.showToast('Success', { status: 'success' })
		store.showToast('Warning', { status: 'warning' })
		store.showToast('Error', { status: 'error' })
		store.showToast('Default', { status: 'default' })
		expect(store.list).toHaveLength(4)
		expect(store.list.map((t) => t.status)).toEqual(['success', 'warning', 'error', 'default'])
	})
})
