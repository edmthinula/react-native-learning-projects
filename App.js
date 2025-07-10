import { StyleSheet, View, FlatList, Button } from 'react-native'
import { useState } from 'react';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import { StatusBar } from 'expo-status-bar';

export default function App () {
  const [courseGoal, setCourseGoal] = useState([]);
  const [modalIsVisible,isModalIsVisible] = useState(false);

  function addGoalHandler (enteredGoalText) {
    setCourseGoal(currentCourseGoals => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ])
    isModalIsVisible(false)
  }
  function deleteGoalHandler (id) {
    setCourseGoal(currentCourseGoals => {
      return currentCourseGoals.filter(goals => goals.id !== id)
    })
  }
  function startAddGoalHandler(){
    isModalIsVisible(true)
  }

  function endAddGoalHandler(){
    isModalIsVisible(false)
  }

  return (
    <>
    <StatusBar style='light' />
    <View style={styles.appcontainer}>
      <Button title='Add New Goal' color='blue' onPress={startAddGoalHandler} />
      <GoalInput onAddGoal={addGoalHandler} visible={modalIsVisible} onCancel={endAddGoalHandler} />
      <View style={styles.goalscontainer}>
        <FlatList
          data={courseGoal}
          renderItem={itemData => {
            return (
              <GoalItem
              text={itemData.item.text}
              onDeleteItem={deleteGoalHandler}
              id={itemData.item.id}
              />
            )
          }}
          keyExtractor={(item, index) => {
            return index
          }}
          />
      </View>
    </View>
          </>
  )
}

const styles = StyleSheet.create({
  appcontainer: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 16,
    // backgroundColor:'#1e085a'
  },
  goalscontainer: {
    // flex:5
    marginTop: 10
  }
})
