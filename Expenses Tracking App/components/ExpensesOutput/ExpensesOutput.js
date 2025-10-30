import { FlatList, View , StyleSheet, Text } from 'react-native'
import Expenses from './Expenses'
import { GlobalStyles } from '../../constants/styles'

const ExpensesOutput = ({ items,title }) => {
  const total = 300.45
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
      <View style={styles.topBar}>
        <Text>
          {title}
        </Text>
        <Text style={styles.priceTag}>
          ${total}
        </Text>
      </View>
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
    },
    topBar:{
      margin:16,
      flexDirection:'row',
      backgroundColor:GlobalStyles.colors.primary50,
      justifyContent:'space-between',
      paddingVertical:10,
      paddingHorizontal:15,
      borderRadius:10,
    },
    priceTag:{
      fontWeight:'bold',
      fontSize:17
    }
})
