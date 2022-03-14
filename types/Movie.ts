export type MovieModel = {
  id: number
  title: String
  overview: String
  image: String
  inCinemas: String
  hasFile: Boolean
  needSync: Boolean
}

export type MovieSearchModel = {
  page: number
  results: MovieModel[]
  total_pages: number
  total_results: number
}
