import { StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesData } from '../data/starting-data'

const AllExpense = () => {
  return (
    <View style={styles.root}>
      <ExpensesOutput expenses={ExpensesData} title='Total' />
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
