import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import RecentScreen from './screens/RecentScreen'
import AllExpenseScreen from './screens/AllExpenseScreen'

const Tab = createBottomTabNavigator()

export default function App () {
  return (
    <>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name='Recent' component={RecentScreen} />
          <Tab.Screen name='All' component={AllExpenseScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'white',
    backgroundColor: '#020202ff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
