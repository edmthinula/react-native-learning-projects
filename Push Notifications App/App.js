import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Alert, Platform, TouchableOpacity } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  })
})

export default function App () {
  const [currentScreen, setCurrentScreen] = useState('Home')
  const [receivedData, setReceivedData] = useState(null)
  const [isScheduling, setIsScheduling] = useState(false)

  // Catch notification taps that open the app from a killed (terminated) state
  const lastNotificationResponse = Notifications.useLastNotificationResponse()

  const handleNotificationTap = (response) => {
    const data = response?.notification?.request?.content?.data
    if (data) {
      setReceivedData(data)
      if (data.screen) {
        setCurrentScreen(data.screen)
      }
    }
  }

  useEffect(() => {
    if (lastNotificationResponse) {
      handleNotificationTap(lastNotificationResponse)
    }
  }, [lastNotificationResponse])

  useEffect(() => {
    async function configureNotifications () {
      const { status } = await Notifications.requestPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert(
          'Permission required',
          'You need to grant notification permissions to receive notifications.'
        )
        return
      }

      // Android requires a notification channel to show notifications properly
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#6366F1',
        })
      }
    }
    configureNotifications()
  }, [])

  useEffect(() => {
    // Listens for when user taps the notification while the app is in background/running
    const responseSubscription = Notifications.addNotificationResponseReceivedListener(
      response => {
        handleNotificationTap(response)
      }
    )

    // Listens for when notification arrives (even while app is open)
    const receivedSubscription = Notifications.addNotificationReceivedListener(
      notification => {
        console.log('Foreground notification received:', notification)
      }
    )

    return () => {
      responseSubscription.remove()
      receivedSubscription.remove()
    }
  }, [])

  async function scheduleNotificationHandler () {
    setIsScheduling(true)
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Welcome Back! 🔔',
          body: 'Tap here to view your profile and see custom notification data.',
          data: { userName: 'TJ', screen: 'Profile', timestamp: new Date().toLocaleTimeString() }
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 5 // 5 seconds for a faster demo loop
        }
      })
    } catch (e) {
      Alert.alert('Error', 'Failed to schedule notification: ' + e.message)
      setIsScheduling(false)
    }
  }

  // Auto reset scheduling button state after 5 seconds
  useEffect(() => {
    if (isScheduling) {
      const timer = setTimeout(() => {
        setIsScheduling(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isScheduling])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        
        {currentScreen === 'Home' ? (
          <View style={styles.card}>
            <Text style={styles.iconHeader}>🔔</Text>
            <Text style={styles.title}>NotifyMe</Text>
            <Text style={styles.description}>
              Experience seamless push notifications and smart deep-link routing in React Native.
            </Text>

            <TouchableOpacity 
              style={[styles.button, isScheduling && styles.buttonDisabled]} 
              onPress={scheduleNotificationHandler}
              disabled={isScheduling}
            >
              <Text style={styles.buttonText}>
                {isScheduling ? 'Scheduling in 5s...' : 'Schedule Notification'}
              </Text>
            </TouchableOpacity>

            {isScheduling && (
              <Text style={styles.helperText}>
                Now background the app or lock your screen to see it in action!
              </Text>
            )}
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.iconHeader}>👤</Text>
            <Text style={styles.title}>User Profile</Text>
            
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>User Name</Text>
              <Text style={styles.dataValue}>{receivedData?.userName || 'Anonymous User'}</Text>
              
              <Text style={styles.dataLabel}>Route Source</Text>
              <Text style={styles.dataValue}>Deep-Linked via Push Notification</Text>
              
              {receivedData?.timestamp && (
                <>
                  <Text style={styles.dataLabel}>Trigger Time</Text>
                  <Text style={styles.dataValue}>{receivedData.timestamp}</Text>
                </>
              )}
            </View>

            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => setCurrentScreen('Home')}
            >
              <Text style={styles.backButtonText}>← Back to Home</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '85%',
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  iconHeader: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  button: {
    width: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#3B4252',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  helperText: {
    fontSize: 12,
    color: '#10B981',
    marginTop: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  dataContainer: {
    width: '100%',
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  dataLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    color: '#64748B',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  dataValue: {
    fontSize: 16,
    color: '#F8FAFC',
    fontWeight: '500',
    marginBottom: 16,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#475569',
  },
  backButtonText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
  },
})
