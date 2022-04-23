import { MovieModel } from '@/types/Movie'

export interface StateModel {
  list?: MovieModel[]
  isLoading: boolean
  hasError: boolean
  query: string
  queryResultList?: MovieModel[]
}

const state = (): StateModel => ({
  list: [],
  isLoading: false,
  hasError: false,
  query: '',
  queryResultList: [],
})

export default state