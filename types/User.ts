export type AuthModel = {
  user: AuthUserModel | null
  token: string | null
}

export type AuthUserModel = {
  name: string
}
