import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import RecentExpenseScreen from './screens/RecentExpense'
import AllExpenseScreen from './screens/AllExpense'
import ManageExpenseScreen from './screens/ManageExpense'
import { Ionicons } from '@expo/vector-icons'
import 'react-native-gesture-handler'
import { GlobalStyles } from './constants/styles'
import IconButton from './UI/IconButton'
import ExpensesProvider from './store/Expenses-context'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

export default function App () {
  function ExpenseOverview ({ navigation }) {
    function pressHandler () {
      navigation.navigate('Manage')
    }

    return (
      <Tab.Navigator
        screenOptions={{
          sceneContainerStyle: {
            backgroundColor: 'black'
          },
          tabBarStyle: {
            backgroundColor: GlobalStyles.colors.primary500
          },
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary500
          },
          headerTintColor: 'white',
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          tabBarInactiveTintColor: GlobalStyles.colors.primary50,
          headerRight: () => (
            <IconButton
              onPress={pressHandler}
              icon='add'
              size={34}
              color={GlobalStyles.colors.primary100}
            />
          )
        }}
      >
        <Tab.Screen
          options={({ route }) => ({
            title: 'Recent Expenses',
            tabBarLabel: 'Recent',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? 'time' : 'time-outline'}
                size={size}
                color={color}
              />
            )
          })}
          name='Recent'
          component={RecentExpenseScreen}
        />
        <Tab.Screen
          options={({ route }) => ({
            title: 'All Expenses',
            tabBarLabel: 'All',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? 'albums' : 'albums-outline'}
                size={size}
                color={color}
              />
            )
          })}
          name='All'
          component={AllExpenseScreen}
        />
      </Tab.Navigator>
    )
  }

  return (
    <>
      <StatusBar style='light' />
      <ExpensesProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: 'white'
            }}
          >
            <Stack.Screen
              name='ExpensesOverview'
              options={{ headerShown: false }}
              component={ExpenseOverview}
            />
            <Stack.Screen
              name='Manage'
              component={ManageExpenseScreen}
              options={{
                presentation: 'modal'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesProvider>
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
