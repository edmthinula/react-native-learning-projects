import { TextInput, StyleSheet, View, Button, Modal, Image } from 'react-native'
import { useState } from 'react'

function GoalInput (props) {
  const [enteredGoalText, setEnteredGoalText] = useState('')
  function goalInputHandler (enteredText) {
    setEnteredGoalText(enteredText)
  }

  function addGoalHandler () {
    props.onAddGoal(enteredGoalText)
    setEnteredGoalText('')
  }

  return (
    <Modal visible={props.visible} animationType='slide'>
      <View style={styles.inputcontainer}>
        <Image source={require('../assets/images/wall.jpg')} style={styles.image} />
        <TextInput
          style={styles.textInput}
          placeholder='Your course Goal!'
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title='add goal' onPress={addGoalHandler} color='#5e0acc' />
          </View>
          <View style={styles.button}>
            <Button title='Cancel' onPress={props.onCancel} color='#f31282' />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default GoalInput

const styles = StyleSheet.create({
  textInput: {
    // flex: 1,
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '75%',
    marginRight: 8,
    paddingLeft: 10,
    color:'white',
    borderColor:'#e4d0ff',
    backgroundColor:'#e4d0ff',
    borderRadius:8
  },
  inputcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    backgroundColor:'#311b6b'
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop:20
  },
  image:{
    width:'100%',
    height:'200',
    margin:20
  },
  button:{
    width:'40%',
    marginHorizontal:8
  }
})
