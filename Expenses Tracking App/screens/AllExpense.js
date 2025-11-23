import { StyleSheet, View } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { useContext } from 'react'
import { ExpensesContext } from '../store/Expenses-context'

const AllExpense = () => {
  const {expenses} = useContext(ExpensesContext)
  return (
    <View style={styles.root}>
      <ExpensesOutput expenses={expenses} title='Total' fallBackText='No registered expenses found' />
    </View>
  )
}

export default AllExpense

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary400
  }
})
