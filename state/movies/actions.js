import { useBaseFetch } from '@/composables/baseFetch'

const actions = {
  async get() {
    this.isLoading = true
    this.hasError = false
    await useBaseFetch('movies')
      .then((res) => {
        if (res != undefined) {
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
  async search(payload) {
    if (payload === this.query) {
      return
    }
    this.query = payload
    if (payload.trim().length === 0) {
      this.isLoading = false
      this.hasError = false
      return
    }
    this.isLoading = true
    this.hasError = false
    await useBaseFetch('movies/info?query=' + encodeURIComponent(payload))
      .then((res) => {
        if (res.status === 200) {
          this.queryResultList = res.data.results
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
    await useBaseFetch(`movies/${payload}`, { method: 'POST' }).then((res) => {
      this.list = { ...this.list, ...res.data }
    })
  },
  async toggle(payload) {
    await useBaseFetch(`movies/${payload.id}/sync`, {
      method: 'PUT',
      body: {
        need_sync: payload.needSync,
      },
    })
  },
}

export default actions
