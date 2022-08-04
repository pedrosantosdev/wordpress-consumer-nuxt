export const isNotEmpty = (s: string): boolean =>
  s !== undefined && s !== null && s !== '' && s.trim().length > 0
