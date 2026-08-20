import { describe, expect, it } from 'vitest'
import { isNotEmpty, isUrl } from '../string'

describe('helpers/string', () => {
	describe('isNotEmpty', () => {
		it('should return false for undefined', () => {
			expect(isNotEmpty(undefined)).toBeFalsy()
		})

		it('should return false for null', () => {
			expect(isNotEmpty(null)).toBeFalsy()
		})

		it('should return false for empty string', () => {
			expect(isNotEmpty('')).toBeFalsy()
		})

		it('should return false for whitespace-only string', () => {
			expect(isNotEmpty('   ')).toBeFalsy()
		})

		it('should return true for non-empty string', () => {
			expect(isNotEmpty('hello')).toBeTruthy()
		})

		it('should return true for string with spaces', () => {
			expect(isNotEmpty(' hello ')).toBeTruthy()
		})
	})

	describe('isUrl', () => {
		it('should return false for undefined', () => {
			expect(isUrl(undefined)).toBeFalsy()
		})

		it('should return false for null', () => {
			expect(isUrl(null)).toBeFalsy()
		})

		it('should return false for empty string', () => {
			expect(isUrl('')).toBeFalsy()
		})

		it('should return false for invalid URL', () => {
			expect(isUrl('not-a-url')).toBeFalsy()
		})

		it('should return true for valid http URL', () => {
			expect(isUrl('http://example.com')).toBeTruthy()
		})

		it('should return true for valid https URL', () => {
			expect(isUrl('https://example.com/path?q=1')).toBeTruthy()
		})
	})
})
