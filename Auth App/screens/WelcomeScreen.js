import { StyleSheet, Text, View } from 'react-native'
import { useAuthStore } from '../store/store'
import { useEffect, useState } from 'react'
import axios from 'axios'

function WelcomeScreen () {
  const REALTIME_DB_BASE_URL = process.env.EXPO_PUBLIC_FIREBASE_REALTIME_DB_URL
  const email = useAuthStore(state => state.email)
  const [fetchedMessage, setFetchedMessage] = useState('')
  const token = useAuthStore(state => state.token)
  useEffect(() => {
    axios
      .get(`${REALTIME_DB_BASE_URL}message.json?auth=${token}`)
      .then(response => {
        setFetchedMessage(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [token])
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully! </Text>
      <Text>{email}</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8
  }
})
