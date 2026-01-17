import { useContext, useLayoutEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import IconButton from '../UI/IconButton'
import { GlobalStyles } from '../constants/styles'
import { ExpensesContext } from '../store/Expenses-context'
import ExpenseForm from '../components/ManageExpense/ExpenseForm'
import { deleteExpense, storeExpense, updateExpense } from '../util/http'
import LoadingOverlay from '../UI/LoadingOverlay'
import ErrorOverlay from '../UI/ErrorOverlay'

const ManageExpense = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId
  const expensesCtx = useContext(ExpensesContext)
  const selectedExpense = expensesCtx.expenses.find(
    expense => expense.id === editedExpenseId
  )
  const [isLoading, setIsLoading] = useState({ loading: false, message: '' })
  const [error, setError] = useState()
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
  async function deleteExpenseHandler () {
    setIsLoading({ loading: true, message: 'Deleting expense..' })
    try {
      await deleteExpense(editedExpenseId)
      expensesCtx.deleteExpense(editedExpenseId)
      setIsLoading({ loading: false, message: '' })
      navigation.goBack()
    } catch (error) {
      setError('Could not delete expense!')
      setIsLoading({ loading: false, message: '' })
    }
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
    setIsLoading(prev => ({ ...prev, loading: true, message: '' }))
    if (isEditing) {
      try {
        setIsLoading(prev => ({ ...prev, loading: true, message: 'Updating expense..' }))
        await updateExpense(editedExpenseId, expenseData)
        expensesCtx.updateExpense({
          id: editedExpenseId,
          ...expenseData
        })
        navigation.goBack()
      } catch (error) {
        setIsLoading(prev => ({ ...prev, loading: false, message: '' }))
        setError('Could not update expense!')
      } finally {
        setIsLoading(prev => ({ ...prev, loading: false, message: '' }))
      }
    } else {
      try {
        setIsLoading(prev => ({ ...prev, loading: true, message: 'Adding expense..' }))
        const id = await storeExpense(expenseData)
        expensesCtx.addExpense({
          id: id,
          ...expenseData
        })
        navigation.goBack()
      } catch (error) {
        setIsLoading(prev => ({ ...prev, loading: false, message: '' }))
        setError('Could not add expense!')
      } finally {
        setIsLoading(prev => ({ ...prev, loading: false, message: '' }))
      }
    }
  }

  function errorHandler () {
    setError(null)
    navigation.goBack()
  }

  if (isLoading.loading) {
    return <LoadingOverlay text={isLoading.message} />
  }
  if (error && !isLoading.loading) {
    return <ErrorOverlay text={error} onConfirm={errorHandler} />
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
