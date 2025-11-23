import { StyleSheet, View } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { useContext } from 'react'
import { ExpensesContext } from '../store/Expenses-context'
import { daysAgo, formatDate } from '../util/date'

const RecentExpense = () => {
  const { expenses } = useContext(ExpensesContext)
  const recentExpenses = expenses.filter(
    expense =>
      expense.date >= daysAgo(7) && expense.date <= formatDate(new Date())
  )
  return (
    <View style={styles.root}>
      <ExpensesOutput expenses={recentExpenses} title='Last 7 Days' fallBackText='No expenses registered for last 7 days' />
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
