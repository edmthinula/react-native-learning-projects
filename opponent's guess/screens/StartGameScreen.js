import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native'
import Title from '../components/ui/Title'
import { useState } from 'react'
import PrimaryButton from '../components/ui/PrimaryButton'
import Colors from '../constants/colors'
import Card from '../components/ui/Card'
import InstructionText from '../components/ui/InstructionText'

function StartGameScreen ({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState('')

  const { width, height } = useWindowDimensions()

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
  const marginTopDistance = height < 380 ? 0 : 100

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior='position'>
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
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
              <PrimaryButton
                style={{ width: '47%' }}
                onPress={resetInputHandler}
              >
                Reset
              </PrimaryButton>
              <PrimaryButton
                style={{ width: '47%' }}
                onPress={confirmInputNumber}
              >
                Confirm
              </PrimaryButton>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
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
    alignItems: 'center'
  },
  screen: {
    flex: 1
  }
})
