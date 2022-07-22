import { MovieLocalModel } from '~~/types/Movie'
import { StateModel } from './state'

const getters = {
  getSearchMovies: (state: StateModel) =>
    state.queryResultList?.map((movie): MovieLocalModel => {
      const movieLocal = state.list?.find(
        (movieFromList) => movieFromList.id === movie.id
      )
      if (movieLocal) {
        return {
          ...movieLocal,
          alreadyAdd: true,
        }
      }
      return {
        ...movie,
        alreadyAdd: false,
      }
    }),
}

export default getters
