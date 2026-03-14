import { useState } from 'react'
import AuthContent from '../components/Auth/AuthContent'
import { createUser } from '../util/auth'
import LoadingOverlay from '../components/ui/LoadingOverlay'

function SignupScreen () {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  async function signUpHandler ({ email, password }) {
    try {
      await createUser(email, password)
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
