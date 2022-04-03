export const state = () => ({
  list: [],
  isLoading: false,
  hasError: false,
  query: '',
  queryResultList: [],
})

export const mutations = {
  setMovies(state, movies) {
    state.list = movies
  },
  add(state, movie) {
    state.list.push({
      ...movie,
      needSync: true,
    })
  },
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },
  setHasError(state, hasError) {
    state.hasError = hasError
  },
  setQueryResultList(state, movies) {
    state.queryResultList = movies
  },
  setQuery(state, query) {
    state.query = query
  },
}

export const actions = {
  async get({ commit }) {
    commit('setIsLoading', true)
    commit('setHasError', false)
    await this.$axios
      .get('movies')
      .then((res) => {
        if (res.status === 200) {
          commit('setMovies', res.data)
        } else {
          commit('setHasError', true)
        }
      })
      .catch(() => {
        commit('setHasError', true)
      })
      .finally(() => {
        commit('setIsLoading', false)
      })
  },
  async search({ commit, state }, payload) {
    if (payload === state.query) {
      return
    }
    commit('setQuery', payload)
    if (payload.trim().length === 0) {
      commit('setIsLoading', false)
      commit('setHasError', false)
      return
    }
    commit('setIsLoading', true)
    commit('setHasError', false)
    await this.$axios
      .get('movies/info?query=' + encodeURIComponent(payload))
      .then((res) => {
        if (res.status === 200) {
          commit('setQueryResultList', res.data.results)
        } else {
          commit('setHasError', true)
        }
      })
      .catch(() => {
        commit('setHasError', true)
      })
      .finally(() => {
        commit('setIsLoading', false)
      })
  },
  async add({ commit }, payload) {
    await this.$axios.post('movies/' + payload).then((res) => {
      commit('add', res.data)
    })
  },
  async toggle({}, payload) {
    await this.$axios.put(`movies/${payload.id}/sync`, {
      need_sync: payload.needSync,
    })
  },
}
