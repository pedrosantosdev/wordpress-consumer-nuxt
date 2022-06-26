import { AuthState } from './state'

const getters = {
  hasError: (state: AuthState) =>
    state.error.message !== '' || state.error.code !== '',
  isAuth: (state: AuthState) => state.token !== null && state.token !== '',
}

export default getters
