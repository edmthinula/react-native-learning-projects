import { StatusBar } from 'expo-status-bar'
import { Button, StyleSheet, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import CategoriesScreen from './screens/CategoriesScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MealsOverviewScreen from './screens/MealsOverviewScreen'
import MealDetailScreen from './screens/MealDetailScreen'
import { createDrawerNavigator } from '@react-navigation/drawer'
import FavoritesScreen from './screens/FavoritesScreen'
import { Ionicons } from '@expo/vector-icons'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()
export default function App () {
  function DrawerNavigator () {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#351401'
          },
          headerTintColor: 'white',
          drawerContentStyle: {
            backgroundColor: '#351401'
          },
          drawerInactiveTintColor: 'white',
          drawerActiveTintColor: '#351401',
          drawerActiveBackgroundColor: '#e0aa88ff'
        }}
      >
        <Drawer.Screen
          name='Categories'
          component={CategoriesScreen}
          options={{
            title: 'All Categories',
            drawerIcon: ({ color, size }) => (
              <Ionicons name='list' color={color} size={size} />
            )
          }}
        />
        <Drawer.Screen
          name='Favorites'
          component={FavoritesScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name='star' color={color} size={size} />
            )
          }}
        />
      </Drawer.Navigator>
    )
  }
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
            name='Drawer'
            component={DrawerNavigator}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name='Meals Overview' component={MealsOverviewScreen} />
          <Stack.Screen name='Meal Detail' component={MealDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

const styles = StyleSheet.create({})
