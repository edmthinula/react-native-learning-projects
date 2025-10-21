import { useContext, useLayoutEffect } from 'react'
import { Image, Text, View, StyleSheet, ScrollView, Button } from 'react-native'
import { MEALS } from '../data/dummy-data'
import MealDetails from '../components/MealDetails'
import Subtitle from '../components/MealDetail/Subtitle'
import List from '../components/MealDetail/List'
import IconButton from '../components/IconButton'
import { FavoritesContext } from '../store/context/favorite-context'

const MealDetailScreen = ({ route, navigation }) => {
  const mealId = route.params.mealId
  const selectedMeal = MEALS.find(meal => meal.id === mealId)
  const favoritesMealCtx = useContext(FavoritesContext)
  const mealIsFavorite = favoritesMealCtx.ids.includes(mealId)
  function changeFavoriteStatuesHandler () {
    if (mealIsFavorite) {
      favoritesMealCtx.removeFavorite(mealId)
    } else {
      favoritesMealCtx.addFavorite(mealId)
    }
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedMeal.title,
      headerRight: () => (
        <IconButton
          onPress={changeFavoriteStatuesHandler}
          icon={mealIsFavorite ? 'star' : 'star-outline'}
          color='white'
        />
      )
    })
  }, [navigation, changeFavoriteStatuesHandler, mealId])
  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  )
}

export default MealDetailScreen

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 350
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
    margin: 8,
    color: 'white'
  },
  detailText: {
    color: 'white'
  },
  subtitle: {
    color: '#e2b497',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 4,
    padding: 6,
    textAlign: 'center'
  },
  subtitleContainer: {
    marginVertical: 4,
    padding: 6,
    marginHorizontal: 24,
    borderBottomColor: '#e2b497',
    borderBottomWidth: 2
  },
  listContainer: {
    maxWidth: '80%'
  },
  listOuterContainer: {
    alignItems: 'center'
    // marginBottom:38
  },
  rootContainer: {
    marginBottom: 38
  }
})
