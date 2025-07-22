
import { Text, View , StyleSheet } from 'react-native'
import Colors from '../../constants/colors'


function NumberContainer ({children}) {
  return (
    <View>
        <Text>
            {children}
        </Text>
    </View>
  )
}

export default NumberContainer

const style = StyleSheet.create({
    container:{
        borderWidth:4,
        borderColor:Colors.accent500,
        padding:24,
        margin:24,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'center'
    }
})