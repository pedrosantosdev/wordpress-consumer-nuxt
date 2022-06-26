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
    useBaseFetch(`login`, {
      method: 'POST',
      body: payload,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        this.token = response.token
        this.user = { name: payload.username }
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
