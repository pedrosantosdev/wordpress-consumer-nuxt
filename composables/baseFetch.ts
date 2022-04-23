export const useBaseFetch = (url: string, options = {}) =>
  $fetch(`${useRuntimeConfig().baseUrl}/${url}`, {
    headers: {
      Accept: 'application/json',
    },
    ...options,
  })
