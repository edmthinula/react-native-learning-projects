import { StatusBar } from 'expo-status-bar';
import { StyleSheet  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CategoriesScreen from './screens/CategoriesScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import MealsOverviewScreen from './screens/MealsOverviewScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
    <StatusBar style='dark' />
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Meals Categories" component={CategoriesScreen} />
        <Stack.Screen name="Meals Overview" component={MealsOverviewScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({

});
