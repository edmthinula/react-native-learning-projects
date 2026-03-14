import { useState } from 'react'
import AuthContent from '../components/Auth/AuthContent'
import { createUser } from '../util/auth'
import { useAuthStore } from '../store/store'
import LoadingOverlay from '../components/ui/LoadingOverlay'

function SignupScreen () {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const authenticate = useAuthStore(state => state.authenticate)
  async function signUpHandler ({ email, password }) {
    try {
      const data = await createUser(email, password)
      authenticate(data)
    } catch (error) {
      console.log('Signup failed:', error.response?.data || error.message)
      alert(
        'Signup failed! ' +
          (error.response?.data?.error?.message || 'Check your connection.')
      )
    } finally {
      setIsAuthenticating(false)
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message='Creating user ....' />
  }

  return <AuthContent onAuthenticate={signUpHandler} />
}

export default SignupScreen
