import { describe, expect, it } from 'vitest'
import { isNotEmpty, isUrl, sanitizePassword, sanitizeUsername } from '../string'

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

	describe('sanitizeUsername', () => {
		it('should remove HTML and quote characters', () => {
			expect(sanitizeUsername('<script>alert("x")</script>')).toBe('scriptalert(x)/script')
		})

		it('should remove control and zero-width characters', () => {
			expect(sanitizeUsername('user\u0000\u200Bname')).toBe('username')
		})

		it('should trim surrounding whitespace', () => {
			expect(sanitizeUsername('  user@example.com  ')).toBe('user@example.com')
		})
	})

	describe('sanitizePassword', () => {
		it('should remove control characters', () => {
			expect(sanitizePassword('p\u0000a\ns\u007Fs')).toBe('pass')
		})

		it('should preserve printable special characters', () => {
			expect(sanitizePassword('p<a&s"s\'w`d')).toBe('p<a&s"s\'w`d')
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
