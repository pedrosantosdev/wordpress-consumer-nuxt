export class MovieModel {
  id!: number
  title!: string
  overview!: string
  image!: string
  inCinemas!: string
  hasFile!: boolean
  needSync!: boolean
}

export class MovieLocalModel extends MovieModel {
  alreadyAdd!: boolean
}

export class MovieSearchModel {
  page!: number
  results!: MovieModel[]
  total_pages!: number
  total_results!: number
}
