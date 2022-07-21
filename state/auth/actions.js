import { useBaseFetch } from '@/composables/baseFetch'

const actions = {
  async login(payload) {
    if (this.isLoading) {
      return
    } else if (payload.username === '' || payload.password === '') {
      this.error = {
        message: 'Missing Fields',
        code: 'empty_fields',
      }
      return
    }
    this.isLoading = true
    this.error = {
      message: '',
      code: '',
    }
    await useBaseFetch(`login`, {
      method: 'POST',
      body: payload,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (response.token && response.token !== '') {
          this.user = { name: payload.username }
          this.token = response.token
          this.expiresAt = response.expiresAt
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
    this.expiresAt = null
    if (redirect) {
      navigateTo('login')
    }
  },
}

export default actions
