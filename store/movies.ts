import { MovieModel } from '~/types/Movie'

export const state = () => ({
  list: [],
  isLoading: false,
  hasError: false,
})

export const mutations = {
  setMovies(state: { list: MovieModel[] }, movies: MovieModel[]) {
    state.list = movies
  },
  add(state: { list: MovieModel[] }, movie: MovieModel) {
    state.list.push({
      ...movie,
      needSync: true,
    })
  },
  toggle(_: {}, movie: MovieModel) {
    movie.needSync = !movie.needSync
  },
  setIsLoading(state: { isLoading: Boolean }, isLoading: Boolean) {
    state.isLoading = isLoading
  },
  setHasError(state: { hasError: Boolean }, hasError: Boolean) {
    state.hasError = hasError
  },
}

export const actions = {
  async get({ commit }): Promise<void> {
    commit('setIsLoading', true)
    commit('setHasError', false)
    await (this as any).$axios
      .get('movies')
      .then((res: { status: number; data: {} }) => {
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
}
