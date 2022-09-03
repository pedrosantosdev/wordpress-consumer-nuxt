import { useBaseFetch } from '@/composables/usBaseFetch'
import { isNotEmpty } from '@/helpers/string'

const actions = {
  async login(payload) {
    if (this.isLoading) {
      return
    } else if (
      !isNotEmpty(payload.get('username')) ||
      !isNotEmpty(payload.get('password'))
    ) {
      this.error = {
        message: 'Missing Fields',
        code: 'empty_fields',
      }
      return
    }
    this.isLoading = true
    this.error = {
      message: null,
      code: null,
    }
    await useBaseFetch(`login`, {
      method: 'POST',
      body: payload,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (
          [response.accessToken, response.refreshToken, response.expires].every(
            (value) => isNotEmpty(value)
          )
        ) {
          this.user = { name: payload.username }
          this.token = response.accessToken
          this.refreshToken = response.refreshToken
          this.expiresAt = response.expires
        }
      })
      .catch(
        (response) =>
          (this.error = {
            message: response.data,
            code: response.code,
          })
      )
      .finally(() => (this.isLoading = false))
  },
  async logout(redirect = true) {
    this.user = null
    this.token = null
    this.refreshToken = null
    this.expiresAt = null
    this.isLoading = false
    this.error = {
      message: null,
      code: null,
    }
    if (redirect) {
      navigateTo('login')
    }
  },
}

export default actions
