import { TextInput, View, StyleSheet, Alert, Text } from 'react-native'
import Title from '../components/ui/Title'
import { useState } from 'react'
import PrimaryButton from '../components/ui/PrimaryButton'
import Colors from '../constants/colors'
import Card from '../components/ui/Card'
import InstructionText from '../components/ui/InstructionText'

function StartGameScreen ({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState('')

  function numberInputHandler (inputText) {
    setEnteredNumber(inputText)
  }

  function confirmInputNumber () {
    const chosenNumber = parseInt(enteredNumber)
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid Number !', 'Number has to be between 1 and 99', [
        { text: 'okay', style: 'destructive', onPress: resetInputHandler }
      ])
      return
    }
    onPickNumber(chosenNumber)
  }

  function resetInputHandler () {
    setEnteredNumber('')
  }

  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>
      <Card>
        <View style={styles.inputWrapper}>
          <InstructionText>Enter Number</InstructionText>
          <TextInput
            style={styles.numberInput}
            maxLength={2}
            keyboardType='number-pad'
            value={enteredNumber}
            onChangeText={numberInputHandler}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <PrimaryButton style={{ width: '47%' }} onPress={resetInputHandler}>
            Reset
          </PrimaryButton>
          <PrimaryButton style={{ width: '47%' }} onPress={confirmInputNumber}>
            Confirm
          </PrimaryButton>
        </View>
      </Card>
    </View>
  )
}

export default StartGameScreen

const styles = StyleSheet.create({
  inputWrapper: {
    alignItems: 'center'
  },
  numberInput: {
    height: 60,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    color: Colors.accent500,
    borderBottomWidth: 2,
    marginVertical: 8,
    fontWeight: 'bold',
    width: 50,
    textAlign: 'center'
  },
  buttonWrapper: {
    flexDirection: 'row'
  },
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center'
  }
})
