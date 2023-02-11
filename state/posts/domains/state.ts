import { PostDomain } from '@/types/Post'

export interface StateModel {
	list?: PostDomain[]
	isLoading: boolean
	hasError: boolean
}

const state = (): StateModel => ({
	list: [],
	isLoading: false,
	hasError: false,
})

export default state
