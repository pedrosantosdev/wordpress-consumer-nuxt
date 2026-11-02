const USERNAME_UNSAFE_CHARACTERS = /[<>"'`]/g

const isUnsafeCodePoint = (code: number): boolean =>
	code <= 0x1f ||
	(code >= 0x7f && code <= 0x9f) ||
	(code >= 0x200b && code <= 0x200d) ||
	code === 0x2028 ||
	code === 0x2029 ||
	code === 0xfeff

const stripUnsafeCodePoints = (s: string): string =>
	Array.from(s)
		.filter((char) => !isUnsafeCodePoint(char.codePointAt(0) ?? 0))
		.join('')

export const isNotEmpty = (s?: string | null): boolean =>
	s !== undefined && s !== null && typeof s === 'string' && s.trim().length > 0

export const sanitizeUsername = (s: string): string =>
	stripUnsafeCodePoints(s).replace(USERNAME_UNSAFE_CHARACTERS, '').trim()

export const sanitizePassword = (s: string): string => stripUnsafeCodePoints(s)

export const isUrl = (s?: string | null): boolean => {
	let isValid = false
	if (isNotEmpty(s)) {
		try {
			new URL(s ?? '')
			isValid = true
		} catch {
			// Invalid URL
		}
	}
	return isValid
}
