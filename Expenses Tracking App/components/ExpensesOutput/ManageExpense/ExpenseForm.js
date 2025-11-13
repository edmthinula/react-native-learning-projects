import { StyleSheet, Text, TextInput, View } from 'react-native'
import Input from './Input'

const ExpenseForm = () => {
  function amountChangeHandler () {}
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label='Amount'
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onchangeText: amountChangeHandler
          }}
        />
        <Input
          label='Date'
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onchangeText: () => {}
          }}
        />
      </View>
      <Input
        style={styles.rowInput}
        label='Descriptions'
        textInputConfig={{
          autoCorrect: false,
          multiline: true,
          autoCapitalize: 'Sentence'
        }}
      />
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
  form: {
    marginTop: 80
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center'
  }
})
