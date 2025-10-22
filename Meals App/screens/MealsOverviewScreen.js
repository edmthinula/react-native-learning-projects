import MealsList from '../components/MealsList/MealsList'
import { useLayoutEffect } from 'react'
import { MEALS, CATEGORIES } from '../data/dummy-data'

const MealsOverviewScreen = ({ route, navigation }) => {
  const catId = route.params.categoryId
  const displayMeals = MEALS.filter(mealItem => {
    return mealItem.categoryIds.indexOf(catId) >= 0
  })
  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      category => category.id === catId
    ).title
    navigation.setOptions({
      title: categoryTitle
    })
  }, [catId, navigation])

  return <MealsList items={displayMeals} />
}

export default MealsOverviewScreen
