import { TextInput, View, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import PrimaryButton from '../components/ui/PrimaryButton';
import Colors from '../constants/colors';

function StartGameScreen({onPickNumber}) {
   const [enteredNumber, setEnteredNumber] = useState('');

   function numberInputHandler(inputText){
      setEnteredNumber(inputText)
   }

   function confirmInputNumber(){
      const chosenNumber = parseInt(enteredNumber);
      if (isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber > 99){
         Alert.alert('Invalid Number !',
            'Number has to be between 1 and 99',
            [{text:'okay',style:'destructive',onPress:resetInputHandler}]
         )
         return;
      }
      onPickNumber(chosenNumber);

   }

   function resetInputHandler(){
      setEnteredNumber('');
   }

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType='number-pad'
          value={enteredNumber}
          onChangeText={numberInputHandler}
        />
      </View>
      <View style={styles.buttonWrapper}>
      <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
      <PrimaryButton onPress={confirmInputNumber}>Confirm</PrimaryButton>
      </View>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 24,
    borderRadius: 8,
    padding: 16,
    marginTop: 100,
    backgroundColor: Colors.primary800,
    elevation: 4,
  },
  inputWrapper: {
    alignItems: 'center', // Center the TextInput only
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
    textAlign: 'center',
  },
  buttonWrapper:{
   flexDirection:'row'
  }
});
