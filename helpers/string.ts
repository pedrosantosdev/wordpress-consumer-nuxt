export const isNotEmpty = (s?: string | null): boolean =>
  s !== undefined && s !== null && s !== '' && s.trim().length > 0
