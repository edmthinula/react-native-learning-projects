import { FlatList, View , StyleSheet, Text } from 'react-native'
import Expenses from './Expenses'

const ExpensesOutput = ({ items }) => {
  function renderExpense (itemData) {
    const item = itemData.item
    const ExpenseProps = {
      id: item.id,
      title: item.title,
      price: item.price,
      expireDate: item.expireDate
    }
    return <Expenses {...ExpenseProps} />
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={renderExpense}
      />
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:16
    }
})
