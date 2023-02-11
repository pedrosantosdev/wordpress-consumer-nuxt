import { Post } from '@/types/Post'
import { Page } from '@/types/Page'

export interface StateModel {
	list?: Post[]
	searchList: Page<Post> | null
	isLoadingSearch: boolean
	currentPost: Post | null
	isLoading: boolean
	hasError: boolean
}

const state = (): StateModel => ({
	list: [],
	searchList: null,
	isLoading: false,
	hasError: false,
	currentPost: null,
	isLoadingSearch: false,
})

export default state
