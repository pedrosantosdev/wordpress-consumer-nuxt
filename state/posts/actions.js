import { useBaseFetch } from '@/composables/baseFetch'
const baseUri = 'posts'
const actions = {
  async get() {
    this.isLoading = true
    this.hasError = false
    await useBaseFetch(baseUri)
      .then((res) => {
        if (
          res != undefined &&
          (typeof res === 'array' || typeof res === 'object')
        ) {
          this.list = res
        } else {
          this.hasError = true
        }
      })
      .catch(() => {
        this.hasError = true
      })
      .finally(() => {
        this.isLoading = false
      })
  },
}

export default actions
