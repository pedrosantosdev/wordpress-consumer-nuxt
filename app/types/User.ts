export type AuthModel = {
	user: AuthUserModel | null
	token: string | null
	refreshToken: string | null
}

export type AuthUserModel = {
	name: string
}
