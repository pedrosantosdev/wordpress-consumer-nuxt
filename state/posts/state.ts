import { Post } from '@/types/Post'
import { Page } from '@/types/Page'

export interface StateModel {
  list?: Post[]
  searchList?: Page<Post>
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
