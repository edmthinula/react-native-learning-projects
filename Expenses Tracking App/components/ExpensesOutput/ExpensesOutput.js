import { FlatList, View, StyleSheet, Text } from 'react-native'
import Expenses from './Expenses'
import { GlobalStyles } from '../../constants/styles'

const ExpensesOutput = ({ expenses = [], title, fallBackText }) => {
  const total = expenses.reduce((sum, expense) => {
    return sum + (expense.amount || 0)
  }, 0)

  /**
   * Render a single expense item as an Expenses component.
   * @param {Object} itemData - FlatList renderItem object whose `item` is an expense with `id`, `title`, `amount`, and `date`.
   * @returns {JSX.Element} The Expenses component for the provided expense item.
   */
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
  let content = <Text style={styles.infoText}>{fallBackText}</Text>
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.amountTag}>${total.toFixed(2)}</Text>
      </View>
      {expenses.length > 0 ? (
        <FlatList
          data={expenses}
          keyExtractor={expense => expense.id}
          renderItem={renderExpense}
        />
      ) : (
        content
      )}
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
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32
  }
})