import { StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesData } from '../data/starting-data'

const RecentExpense = () => {
  return (
    <View style={styles.root}>
      <ExpensesOutput expenses={ExpensesData} title='7 Days Later' />
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
