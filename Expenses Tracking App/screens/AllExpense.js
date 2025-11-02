import { StyleSheet, View } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { useSelector } from 'react-redux'

const AllExpense = () => {
  const AllExpense = useSelector(state => state.expenses)
  return (
    <View style={styles.root}>
      <ExpensesOutput expenses={AllExpense.expenses} title='Total' />
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
