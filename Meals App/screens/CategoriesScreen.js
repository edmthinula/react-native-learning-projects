import CategoryGridTile from '../components/CategoryGridTile'
import { CATEGORIES } from '../data/dummy-data'
import { FlatList } from 'react-native'


const CategoriesScreen = ({ navigation }) => {
  function renderCategoryItem (itemData) {
  function pressHandler () {
    navigation.navigate('Meals Overview',{
      categoryId: itemData.item.id,
    })
  }

  return (
    <CategoryGridTile
      title={itemData.item.title}
      color={itemData.item.color}
      onPress={pressHandler}
    />
  )
}
  return (
    <>
      <FlatList
      style={{backgroundColor: '#3f2f25',}}
        data={CATEGORIES}
        keyExtractor={item => item.id}
        renderItem={renderCategoryItem}
        numColumns={2}
      />
    </>
  )
}

export default CategoriesScreen
