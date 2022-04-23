const actions = {
  async get() {
    this.setIsLoading = true
    this.setHasError = false
    await this.$axios
      .get('movies')
      .then((res) => {
        if (res.status === 200) {
          this.setMovies = res.data
        } else {
          this.setHasError = true
        }
      })
      .catch(() => {
        this.setHasError = true
      })
      .finally(() => {
        this.setIsLoading = false
      })
  },
  async search(payload) {
    if (payload === this.query) {
      return
    }
    this.setQuery = payload
    if (payload.trim().length === 0) {
      this.setIsLoading = false
      this.setHasError = false
      return
    }
    this.setIsLoading = true
    this.setHasError = false
    await this.$axios
      .get('movies/info?query=' + encodeURIComponent(payload))
      .then((res) => {
        if (res.status === 200) {
          this.setQueryResultList = res.data.results
        } else {
          this.setHasError = true
        }
      })
      .catch(() => {
        this.setHasError = true
      })
      .finally(() => {
        this.setIsLoading = false
      })
  },
  async add(payload) {
    await this.$axios.post('movies/' + payload).then((res) => {
      this.add = res.data
    })
  },
  async toggle(payload) {
    await this.$axios.put(`movies/${payload.id}/sync`, {
      need_sync: payload.needSync,
    })
  },
}

export default actions
