import { useContext, useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import IconButton from '../UI/IconButton'
import { GlobalStyles } from '../constants/styles'
import Button from '../UI/Button'
import { ExpensesContext } from '../store/Expenses-context'
import { daysAgo } from '../util/date'

const ManageExpense = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId
  const expensesCtx = useContext(ExpensesContext)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation])

  function deleteExpenseHandler () {
    expensesCtx.deleteExpense(editedExpenseId)
    navigation.goBack()
  }
  function cancelHandler () {
    navigation.goBack()
  }
  function confirmedHandler () {
    if(isEditing){
      expensesCtx.updateExpense({
        id:editedExpenseId,date:daysAgo(4),amount:289 , title:'Ryzen 7 5700X'
      })
    }else{
      expensesCtx.addExpense({
        id:14,date:daysAgo(3),amount: 34,title:'Testing'
      })
    }
    navigation.goBack()
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
