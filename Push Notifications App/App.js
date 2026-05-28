
import { StatusBar } from 'expo-status-bar'
import { Button, StyleSheet, Text, View, Alert } from 'react-native'
import { useEffect } from 'react'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true
  })
})

export default function App () {
  useEffect(() => {
    async function requestPermissions() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'You need to grant notification permissions to receive notifications.');
      }
    }
    requestPermissions();
  }, []);

  async function scheduleNotificationHandler () {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'My first local notification',
          body: 'This is the body of the notification',
          data: { userName: 'TJ' }
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 10
        }
      });
      console.log('Notification scheduled!');
      // Reminder: On Android, notifications scheduled with a time interval will only show if the app is in the background or closed.
    } catch (e) {
      Alert.alert('Error', 'Failed to schedule notification: ' + e.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button
        title='schedule Notification'
        onPress={scheduleNotificationHandler}
      />
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
