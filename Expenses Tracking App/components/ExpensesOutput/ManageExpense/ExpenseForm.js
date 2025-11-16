import { Alert, StyleSheet, Text, View } from 'react-native'
import Input from './Input'
import { useState } from 'react'
import Button from '../../../UI/Button'
import { formatDate } from '../../../util/date'

const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValue
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : '',
      isValid: !!defaultValue
    },
    date: {
      value: defaultValue ? defaultValue.date : '',
      isValid: !!defaultValue
    },
    title: {
      value: defaultValue ? defaultValue.title : '',
      isValid: !!defaultValue
    }
  })
  function inputChangeHandler (inputIdentifier, enteredText) {
    setInputs(crntInputs => {
      return {
        ...crntInputs,
        [inputIdentifier]: {value:enteredText,isValid:true}
      }
    })
  }
  function submitHandler () {
    const expenseData = {
      amount: +inputs.amount.value,
      date: formatDate(new Date(inputs.date.value)),
      title: inputs.title.value
    }
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
    const titleIsValid = expenseData.title.trim().length > 0
    if (!amountIsValid || !dateIsValid || !titleIsValid) {
      Alert.alert('Invalid input', 'Please check your input values')
      return
    }
    onSubmit(expenseData)
  }
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label='Amount'
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputs.amount.value
          }}
        />
        <Input
          style={styles.rowInput}
          label='Date'
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputs.date.value
          }}
        />
      </View>
      <Input
        style={styles.rowInput}
        label='Title'
        textInputConfig={{
          autoCorrect: false,
          multiline: true,
          autoCapitalize: 'Sentence',
          onChangeText: inputChangeHandler.bind(this, 'title'),
          value: inputs.title.value
        }}
      />
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
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowInput: {
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center'
  },
  buttonsContainer: {
    marginTop: 120,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  }
})
