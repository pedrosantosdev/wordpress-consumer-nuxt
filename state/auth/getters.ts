import { isNotEmpty } from '@/helpers/string'
import { AuthState } from './state'

const getters = {
	hasError: (state: AuthState) => isNotEmpty(state.error.message) || isNotEmpty(state.error.code),
	isAuth: (state: AuthState) => isNotEmpty(state.token),
	isExpired: (state: AuthState) =>
		state.expiresAt ? new Date(Date.parse(state.expiresAt)) < new Date() : false,
}

export default getters
