import { Post } from '@/types/Post'

export interface StateModel {
  list?: Post[]
  isLoading: boolean
  hasError: boolean
}

const state = (): StateModel => ({
  list: [],
  isLoading: false,
  hasError: false,
})

export default state
