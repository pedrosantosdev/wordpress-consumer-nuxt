import { StateModel } from './state'

const getters = {
  isLoading: (state: StateModel) => state.isLoading,
  hasError: (state: StateModel) => state.hasError,
  getMoviesList: (state: StateModel) => state.list,
  getSearchMoviesList: (state: StateModel) => state.queryResultList,
}

export default getters
