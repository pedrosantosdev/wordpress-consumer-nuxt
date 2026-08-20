import { describe, expect, it } from 'vitest'
import { useLockScroll } from '../useLockScroll'

describe('useLockScroll', () => {
	it('should add overflow-hidden class when lock is true', () => {
		document.body.className = ''
		useLockScroll(true)
		expect(document.body.classList.contains('overflow-hidden')).toBe(true)
	})

	it('should remove overflow-hidden class when lock is false', () => {
		document.body.className = 'overflow-hidden'
		useLockScroll(false)
		expect(document.body.classList.contains('overflow-hidden')).toBe(false)
	})

	it('should default to lock=true', () => {
		document.body.className = ''
		useLockScroll()
		expect(document.body.classList.contains('overflow-hidden')).toBe(true)
	})

	it('should not add class if already present', () => {
		document.body.className = 'overflow-hidden'
		useLockScroll(true)
		expect(document.body.classList.contains('overflow-hidden')).toBe(true)
	})
})
