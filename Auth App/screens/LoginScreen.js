import { useState } from 'react'
import AuthContent from '../components/Auth/AuthContent'
import { login } from '../util/auth'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { AuthErrors } from '../constants/auth'
import { Alert } from 'react-native'
import { useAuthStore } from '../store/store'

function LoginScreen () {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const authenticate = useAuthStore((state)=>state.authenticate)
  async function loginHandler ({ email, password }) {
    setIsAuthenticating(true)
    try {
      const data = await login(email, password)
      authenticate(data)
    } catch (error) {
      const firebaseError = error.response?.data?.error?.message
      console.log(firebaseError)
      let message =
        'Could not log you in. Please check your credentials or connection.'
      if (firebaseError === AuthErrors.emailNotFound) {
        message = `There is no user record corresponding to this ${email}.`
      } else if (firebaseError === AuthErrors.invalidPassword) {
        message = 'The password you entered is incorrect.'
      } else if (firebaseError === AuthErrors.userDisabled) {
        message = 'This user account has been disabled by an administrator.'
      } else if (firebaseError === AuthErrors.invalidLogin) {
        message = 'Invalid login attempt.'
      }
      Alert.alert('Authentication Failed', message)
      setIsAuthenticating(false)
    } finally {
      setIsAuthenticating(false)
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message='Login in user ....' />
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />
}

export default LoginScreen
