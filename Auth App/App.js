import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { useAuthStore } from './store/store'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import { Colors } from './constants/styles'
import IconButton from './components/ui/IconButton'
import LoadingOverlay from './components/ui/LoadingOverlay'

const Stack = createNativeStackNavigator()

function AuthStack () {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 }
      }}
    >
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
    </Stack.Navigator>
  )
}

function AuthenticatedStack () {
  const logout = useAuthStore(state => state.logout)
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 }
      }}
    >
      <Stack.Screen
        name='Welcome'
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon='exit'
              color={tintColor}
              size={24}
              onPress={logout}
            />
          )
        }}
      />
    </Stack.Navigator>
  )
}

function Navigation () {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const hasHydrated = useAuthStore(state => state._hasHydrated)
  if (!hasHydrated) {
    return <LoadingOverlay message='Starting app...' />
  }
  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default function App () {
  return (
    <>
      <StatusBar style='light' />

      <Navigation />
    </>
  )
}
