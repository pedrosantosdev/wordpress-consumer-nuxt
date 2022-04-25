export type AuthModel = {
  isAuth: boolean
  user: AuthUserModel | null
}

export type AuthUserModel = {
  name: string
}
