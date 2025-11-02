import { StyleSheet, View } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { daysAgo } from '../util/date'
import { useSelector } from 'react-redux'

const RecentExpense = () => {
  const AllExpense = useSelector(state => state.expenses)
  const recentExpenses = AllExpense.expenses.filter(expense => expense.date > daysAgo(7))
  return (
    <View style={styles.root}>
      <ExpensesOutput expenses={recentExpenses} title='Last 7 Days' />
    </View>
  )
}

export default RecentExpense

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary400
  }
})
