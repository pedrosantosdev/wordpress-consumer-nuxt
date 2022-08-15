import { useBaseFetch } from '@/composables/baseFetch'
const baseUri = 'post-domain'
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
  async add(payload) {
    await useBaseFetch(baseUri, { method: 'POST', body: payload })
  },
  async update(payload) {
    await useBaseFetch(`${baseUri}`, {
      method: 'PUT',
      body: payload,
    }).then(() => {
      this.list = this.list.map((item) => {
        if (item.id === payload.id) {
          return { ...item, ...payload }
        }
        return item
      })
    })
  },
  async delete(payload) {
    await useBaseFetch(`${baseUri}/${payload}`, { method: 'DELETE' }).then(
      () => {
        this.list = this.list.filter((item) => item.id !== payload)
      }
    )
  },
}

export default actions
