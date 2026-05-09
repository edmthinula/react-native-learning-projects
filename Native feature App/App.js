import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import AllPlaces from './screens/AllPlaces,'
import AddPlace from './screens/AddPlace'
import IconButton from './components/UI/IconButton'
import { Colors } from './constants/colors'
import Map from './screens/Map'
import { useEffect, useState } from 'react'
import { init } from './util/database'
import * as SplashScreen from 'expo-splash-screen'

const Stack = createNativeStackNavigator()
SplashScreen.preventAutoHideAsync()

export default function App () {
  const [dbInitialized, setDbInitialized] = useState(false)
  useEffect(() => {
    async function prepareDatabase () {
      try {
        await init()
        setDbInitialized(true)
      } catch (error) {
        console.warn('Database failed to load:', error)
      }finally{
        await SplashScreen.hideAsync()
      }
    }
    prepareDatabase()
  }, [])
  if (!dbInitialized){
    return null;
  }
  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 }
          }}
        >
          <Stack.Screen
            name='AllPlaces'
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your favorite places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon='add'
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate('AddPlace')}
                />
              )
            })}
          />
          <Stack.Screen
            options={{ title: 'Add a new Place' }}
            name='AddPlace'
            component={AddPlace}
          />
          <Stack.Screen name='Map' component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

const styles = StyleSheet.create({})
