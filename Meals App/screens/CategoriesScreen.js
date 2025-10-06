import CategoryGridTile from '../components/CategoryGridTile'
import { CATEGORIES } from '../data/dummy-data'
import { FlatList } from 'react-native'

function renderCategoryItem (itemData) {
  return (
    <CategoryGridTile title={itemData.item.title} color={itemData.item.color} />
  )
}

const CategoriesScreen = () => {
  return (
    <>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        numColumns={2}
      />
    </>
  )
}

export default CategoriesScreen
