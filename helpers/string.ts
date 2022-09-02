export const isNotEmpty = (s?: string | null): boolean =>
  s !== undefined && s !== null && s !== '' && s.trim().length > 0

export const isUrl = (s?: string | null): boolean => {
  let isValid = false
  if (isNotEmpty(s)) {
    try {
      new URL(s ?? '')
      isValid = true
    } catch (e) {}
  }
  return isValid
}
