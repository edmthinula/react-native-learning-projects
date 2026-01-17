import { useContext, useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import IconButton from '../UI/IconButton'
import { GlobalStyles } from '../constants/styles'
import { ExpensesContext } from '../store/Expenses-context'
import ExpenseForm from '../components/ManageExpense/ExpenseForm'
import { storeExpense } from '../util/http'

const ManageExpense = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId
  const expensesCtx = useContext(ExpensesContext)
  const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  /**
   * Delete the expense being edited and return to the previous screen.
   *
   * Deletes the expense identified by the current editedExpenseId from the expenses context
   * and navigates back. */
  }, [navigation, isEditing])
  function deleteExpenseHandler () {
    expensesCtx.deleteExpense(editedExpenseId)
    navigation.goBack()
  }
  /**
   * Cancel the current operation and return to the previous screen.
   */
  function cancelHandler () {
    navigation.goBack()
  }
  /**
   * Saves the provided expense data: updates an existing expense when editing or adds a new expense otherwise, then navigates back.
   * @param {Object} expenseData - Expense properties to persist (for example: `amount`, `date`, and `title`).
   */
  async function confirmedHandler (expenseData) {
    if (isEditing) {
      expensesCtx.updateExpense({
        id: editedExpenseId,
        ...expenseData
      })
    } else {
      const id = await storeExpense(expenseData)
      expensesCtx.addExpense({
        id: id, 
        ...expenseData
      })
    }
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onCancel={cancelHandler}
        onSubmit={confirmedHandler}
        defaultValue={selectedExpense}
      />
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
  }
})