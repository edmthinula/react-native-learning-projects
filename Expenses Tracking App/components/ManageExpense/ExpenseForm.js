import { StyleSheet, Text, View } from 'react-native'
import Input from './Input'
import { useState } from 'react'
import Button from '../../../UI/Button'
import { formatDate } from '../../../util/date'
import { GlobalStyles } from '../../../constants/styles'

const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValue
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : '',
      isValid: true
    },
    date: {
      value: defaultValue ? defaultValue.date : '',
      isValid: true
    },
    title: {
      value: defaultValue ? defaultValue.title : '',
      isValid: true
    }
  })

  function inputChangeHandler (inputIdentifier, enteredText) {
    setInputs(crntInputs => ({
      ...crntInputs,
      [inputIdentifier]: { value: enteredText, isValid: true }
    }))
  }

  function submitHandler () {
    const dateString = inputs.date.value
    const dateParts = dateString.split('-')
    const parsedDate =
      dateParts.length === 3
        ? new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2])
        : new Date('invalid')
    const expenseData = {
      amount: +inputs.amount.value,
      date: parsedDate,
      title: inputs.title.value
    }

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
    const titleIsValid = expenseData.title.trim().length > 0

    if (!amountIsValid || !dateIsValid || !titleIsValid) {
      setInputs(curInputs => ({
        amount: { value: curInputs.amount.value, isValid: amountIsValid },
        date: { value: curInputs.date.value, isValid: dateIsValid },
        title: { value: curInputs.title.value, isValid: titleIsValid }
      }))
      return
    }

    // Format the date before send
    expenseData.date = formatDate(expenseData.date)

    onSubmit(expenseData)
  }

  const formIsInvalid =
    !inputs.amount.isValid || !inputs.date.isValid || !inputs.title.isValid

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>

      <View style={styles.row}>
        <Input
          label='Amount'
          style={styles.rowInput}
          inValid={inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputs.amount.value
          }}
        />

        <Input
          label='Date'
          style={styles.rowInput}
          inValid={inputs.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputs.date.value
          }}
        />
      </View>

      <Input
        label='Title'
        inValid={inputs.title.isValid}
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          autoCapitalize: 'sentences',
          onChangeText: inputChangeHandler.bind(this, 'title'),
          value: inputs.title.value
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values — please check your entered data!
        </Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button mode='flat' onPress={onCancel} style={styles.button}>
          Cancel
        </Button>

        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  )
}

export default ExpenseForm

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 24,
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowInput: {
    flex: 1
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    marginVertical: 10,
    backgroundColor: GlobalStyles.colors.error50,
    padding: 10,
    borderRadius: 6
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  }
})
