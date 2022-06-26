export type AuthModel = {
  isAuth: boolean
  user: AuthUserModel | null
  token: string | null
}

export type AuthUserModel = {
  name: string
}
