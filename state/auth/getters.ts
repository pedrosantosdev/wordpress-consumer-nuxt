import { AuthState } from './state'

const getters = {
  hasError: (state: AuthState) =>
    state.error.message !== '' || state.error.code !== '',
  isAuth: (state: AuthState) => state.token !== null && state.token !== '',
  isExpired: (state: AuthState) =>
    state.expiresAt
      ? new Date(Date.parse(state.expiresAt)) < new Date()
      : false,
}

export default getters
