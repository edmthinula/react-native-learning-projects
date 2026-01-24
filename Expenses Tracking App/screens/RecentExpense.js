import { StyleSheet, View } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { useContext, useEffect, useState } from 'react'
import { ExpensesContext } from '../store/Expenses-context'
import { daysAgo, formatDate } from '../util/date'
import { fetchExpense } from '../util/http'
import LoadingOverlay from '../UI/LoadingOverlay'
import ErrorOverlay from '../UI/ErrorOverlay'

const RecentExpense = () => {
  const expensesCtx = useContext(ExpensesContext)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  useEffect(() => {
    async function getExpenses () {
      setIsLoading(true)
      try {
        const dbExpenses = await fetchExpense()
        expensesCtx.setExpenses(dbExpenses)
      } catch (error) {
        setIsLoading(false)
        setError('Could not fetch expenses!')
      } finally {
        setIsLoading(false)
      }
    }
    getExpenses()
  }, [])

  function errorHandler () {
    setError(null)
  }

  if (isLoading) {
    return <LoadingOverlay text='Loading expenses...' />
  }
  if (error && !isLoading) {
    return <ErrorOverlay text={error} onConfirm={errorHandler} />
  }

  const today = new Date()
  const sevenDaysAgo = new Date(daysAgo(7))

  const recentExpenses = expensesCtx.expenses.filter(expense => {
    const expenseDate = new Date(expense.date)
    return expenseDate >= sevenDaysAgo && expenseDate <= today
  })
  return (
    <View style={styles.root}>
      <ExpensesOutput
        expenses={recentExpenses}
        title='Last 7 Days'
        fallBackText='No expenses registered for last 7 days'
      />
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
