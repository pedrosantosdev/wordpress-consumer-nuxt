import { AuthUserModel, AuthModel } from '@/types/User'

export const useBaseAuth = () => {
  const key = 'auth'
  const defaultOptions = {
    secure: true,
  }
  const defaultValues = () => {
    return useCookie<AuthModel>(key, defaultOptions).value
  }

  let _isAuth = defaultValues()?.isAuth || false
  let _user: AuthUserModel | null = defaultValues()?.user || null

  const getUser = (): AuthModel => {
    // Get Formatted Values
    return {
      isAuth: _isAuth,
      user: _user,
    }
  }

  const saveState = () => {
    // Save Changes on cookie
    useCookie<AuthModel>(key, defaultOptions).value = getUser()
  }

  const setUser = (user: AuthUserModel) => {
    _user = user
    _isAuth = true

    saveState()
  }

  const clear = () => {
    _user = null
    _isAuth = false

    saveState()
  }

  return {
    isAuth: _isAuth,
    getUser,
    setUser,
    clear,
  }
}
