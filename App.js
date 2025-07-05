import { StyleSheet, Text, View, Button, TextInput } from 'react-native'

export default function App () {
  return (
    <View style={styles.appcontainer}>
      <View style={styles.inputcontainer}>
        <TextInput style={styles.textInput} placeholder='Your course Goal!' />
        <Button title='add goal'/>
      </View>
      <View>
        <Text style={styles.goalscontainer}>
          List of goal ....
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  appcontainer:{
    flex:1,
    flexDirection:'column',
    paddingTop:80,
    paddingHorizontal:16
  },
  inputcontainer:{
    // flex:1,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingBottom:20,
    borderBottomColor:"green",
    borderBottomWidth:2
  },
  textInput:{
    flex:1,
    borderWidth:1,
    borderColor:'#cccccc',
    width:'%',
    marginRight:8,
    paddingLeft:5,
  },
  goalscontainer:{
    // flex:5
  }
  
})
