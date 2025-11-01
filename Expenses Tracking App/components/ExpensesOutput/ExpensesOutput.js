import { FlatList, View, StyleSheet, Text } from 'react-native'
import Expenses from './Expenses'
import { GlobalStyles } from '../../constants/styles'

const ExpensesOutput = ({ expenses, title }) => {
  const total = expenses.reduce((sum, expense) => {
    return sum + expense.amount
  }, 0)

  function renderExpense (itemData) {
    const item = itemData.item
    const ExpenseProps = {
      id: item.id,
      title: item.title,
      amount: item.amount,
      date: item.date
    }
    return <Expenses {...ExpenseProps} />
  }
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.amountTag}>${total.toFixed(2)}</Text>
      </View>
      <FlatList
        data={expenses}
        keyExtractor={expense => expense.id}
        renderItem={renderExpense}
      />
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700
  },
  topBar: {
    marginBottom: 16,
    flexDirection: 'row',
    backgroundColor: GlobalStyles.colors.primary50,
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10
  },
  amountTag: {
    fontWeight: 'bold',
    fontSize: 17,
    color: GlobalStyles.colors.primary500
  },
  title: {
    color: GlobalStyles.colors.primary500
  }
})
