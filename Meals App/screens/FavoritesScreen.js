import { StyleSheet, Text, View } from 'react-native'
import MealsList from '../components/MealsList/MealsList'
import { useContext } from 'react'
import { FavoritesContext } from '../store/context/favorite-context'
import { MEALS } from '../data/dummy-data'

const FavoritesScreen = () => {
  const favoritesMealCtx = useContext(FavoritesContext)

  const favoriteMeals = MEALS.filter(meal =>
    favoritesMealCtx.ids.includes(meal.id)
  )
  if (favoriteMeals.length == 0) {
    return (
      <View style={[styles.root,styles.textContainer]}>
        <Text style={styles.text}>You have no favorite meals yet.</Text>
      </View>
    )
  }
  return (
    <View style={styles.root}>
      <MealsList items={favoriteMeals} />
    </View>
  )
}

export default FavoritesScreen

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#3f2f25',
    flex: 1
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  }
})
