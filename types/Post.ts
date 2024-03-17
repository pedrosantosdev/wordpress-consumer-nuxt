export type Post = {
	id: number
	date: string
	link: string
	image_url: string
	title: { rendered: string }
	content: { rendered: string }
	excerpt: { rendered: string }
	domain_id?: number
}

export type PostDomain = {
	id: number
	endpoint: string
	healthEndpoint: string
	isHealth: boolean
	active: boolean
	viewOrder: number
	domain_id?: number
}
