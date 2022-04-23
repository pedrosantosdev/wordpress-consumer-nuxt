import { env } from 'process'

export const useBaseFetch = (url: string, options = {}) =>
  $fetch(`/${env.baseUrl}/${url}`, {
    headers: {
      Accept: 'application/json',
    },
    ...options,
  })
