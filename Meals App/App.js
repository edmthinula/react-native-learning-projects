import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import CategoriesScreen from './screens/CategoriesScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MealsOverviewScreen from './screens/MealsOverviewScreen'

export default function App () {
  const Stack = createNativeStackNavigator()
  return (
    <>
      <StatusBar style='light' />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#351401'
            },
            headerTintColor: 'white',
            contentStyle: {
              backgroundColor: '#3f2f25'
            }
          }}
        >
          <Stack.Screen
            name='Meals Categories'
            component={CategoriesScreen}
            options={{
              title: 'All Categories',
              // headerStyle: {
              //   backgroundColor: '#351401'
              // },
              // headerTintColor: 'white',
              // contentStyle: {
              //   backgroundColor: '#3f2f25'
              // }
            }}
          />
          <Stack.Screen name='Meals Overview' component={MealsOverviewScreen}  />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

const styles = StyleSheet.create({})
