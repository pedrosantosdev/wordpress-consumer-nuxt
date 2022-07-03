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
        this.user = { name: payload.username }
        this.token = response.token
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
}

export default actions
