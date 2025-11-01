import { StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesData } from '../data/starting-data'
import { useSelector } from 'react-redux'

const RecentExpense = () => {
  const AllExpense = useSelector(state => state.expenses)
  return (
    <View style={styles.root}>
      <ExpensesOutput expenses={AllExpense.expenses} title='7 Days Later' />
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
