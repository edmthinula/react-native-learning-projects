import { StyleSheet, Text, TextInput, View } from 'react-native'
import { GlobalStyles } from '../../../constants/styles'

const Input = ({ label, style, textInputConfig, inValid }) => {
  const inputStyles = [styles.input]

  if (textInputConfig?.multiline) {
    inputStyles.push(styles.inputMultiLine)
  }

  if (!inValid) {
    inputStyles.push(styles.inValidInput)
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, !inValid && styles.inValidLabel]}>
        {label}
      </Text>
      <TextInput {...textInputConfig} style={inputStyles} />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 10
  },
  label: {
    fontSize: 16,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18
  },
  inputMultiLine: {
    minHeight: 100,
    textAlignVertical: 'top'
  },
  inValidLabel: {
    color: GlobalStyles.colors.error500
  },
  inValidInput: {
    backgroundColor: GlobalStyles.colors.error50
  }
})
