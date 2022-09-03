import { useBaseFetch } from '@/composables/usBaseFetch'
const baseUri = 'posts'
const actions = {
  async get(page = 1) {
    this.isLoading = true
    this.hasError = false
    await useBaseFetch(baseUri, {
      params: { page },
    })
      .then((res) => {
        if (
          res != undefined &&
          (typeof res === 'array' || typeof res === 'object')
        ) {
          if (page === 1) {
            this.list = res
          } else {
            this.list.push(res)
          }
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
  async search(query, page = 1) {
    this.isLoadingSearch = true
    await useBaseFetch(baseUri, {
      params: { search: query, page },
    })
      .then((res) => {
        if (
          res != undefined &&
          (typeof res === 'array' || typeof res === 'object')
        ) {
          const formatted = {
            page,
            results: page === 1 ? res : this.searchList.results.push(res),
            total_pages: 1,
          }
          this.searchList = formatted
        }
      })
      .finally(() => {
        this.isLoadingSearch = false
      })
  },
  async getById(id) {
    useBaseFetch(`${baseUri}/${id}`).then((res) => {
      if (res != undefined && typeof res === 'object') {
        this.currentPost = res
      }
    })
  },
}

export default actions
