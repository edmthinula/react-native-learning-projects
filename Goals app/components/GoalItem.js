import { StyleSheet, View, Text, Pressable } from 'react-native'

function GoalItem (props) {
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: '#ddddad' }}
        onPress={() => props.onDeleteItem(props.id)}
        style={({pressed})=>pressed && styles.pressedItem}
      >
        <Text
          style={{
            color: 'white',
            padding:8
          }}
        >
          {props.text}
        </Text>
      </Pressable>
    </View>
  )
}

export default GoalItem

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
    padding: 8,
    color: 'white'
  },
  pressedItem:{
    opacity:0.5
  }
})
