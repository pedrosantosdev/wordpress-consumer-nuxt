export type MovieModel = {
	id: number
	title: string
	overview: string
	image: string
	inCinemas: string
	hasFile: boolean
	needSync: boolean
}

export type MovieLocalModel = MovieModel & {
	alreadyAdd: boolean
}

export type MovieSearchModel = {
	page: number
	results: MovieModel[]
	total_pages: number
	total_results: number
}
