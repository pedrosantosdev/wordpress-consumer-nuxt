export type Page<T> = {
	page: number
	results: T[]
	total_pages: number
}
