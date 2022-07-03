import { AuthModel } from '@/types/User'

export interface AuthState extends AuthModel {
  lastPage: string
  isLoading: false
  error: {
    message: string
    code: string
  }
}

const state = (): AuthState => ({
  lastPage: '/',
  token: null,
  user: null,
  isLoading: false,
  error: {
    message: '',
    code: '',
  },
})

export default state
