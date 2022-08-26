export type Post = {
  id: number
  date: string
  link: string
  image_url: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
}

export type PostDomain = {
  id: number
  endpoint: string
  healthEndpoint: string
  isHealth: boolean
  active: boolean
}
