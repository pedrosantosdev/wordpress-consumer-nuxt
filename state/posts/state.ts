import { Post } from '@/types/Post'

export interface StateModel {
  list?: Post[]
  currentPost: Post | null
  isLoading: boolean
  hasError: boolean
}

const state = (): StateModel => ({
  list: [],
  isLoading: false,
  hasError: false,
  currentPost: null,
})

export default state
