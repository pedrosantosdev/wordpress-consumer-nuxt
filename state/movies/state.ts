import { MovieLocalModel, MovieModel } from '@/types/Movie'

export interface StateModel {
  list?: MovieModel[]
  isLoading: boolean
  hasError: boolean
  query: string
  queryResultList?: MovieLocalModel[]
}

const state = (): StateModel => ({
  list: [],
  isLoading: false,
  hasError: false,
  query: '',
  queryResultList: [],
})

export default state
