import { useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import IconButton from '../UI/IconButton'
import { GlobalStyles } from '../constants/styles'
import Button from '../UI/Button'
import { useDispatch, useSelector } from 'react-redux'
import { addExpenses ,deleteExpenses } from '../store/Expenses'
import { daysAgo } from '../data/starting-data'
import { ExpensesData } from '../data/starting-data'

const ManageExpense = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId
  const dispatch = useDispatch()
  const AllExpense = useSelector(state => state.expenses)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation])

  function closeManageExpenses () {
    navigation.goBack()
  }

  function deleteExpenseHandler () {
    dispatch(deleteExpenses({id:27}))
    closeManageExpenses()
  }
  function cancelHandler () {
    closeManageExpenses()
  }
  function confirmedHandler () {
    const expense = {
      id: 27,
      title: '--------TESTING-------------',
      amount: 85.0,
      date: daysAgo(30) 
    }
    dispatch(addExpenses(expense))
    closeManageExpenses()
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button mode='flat' onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmedHandler} style={styles.button}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  )
}

export default ManageExpense

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  }
})
