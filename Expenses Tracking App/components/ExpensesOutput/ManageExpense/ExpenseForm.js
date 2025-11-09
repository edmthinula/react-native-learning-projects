import { Text, TextInput, View } from "react-native"
import Input from "./Input"


const ExpenseForm = () => {
  return (
    <View>
        <Input label='Descriptions'/>
        <Input label='Amount'/>
        <Input label ='Date'/>
    </View>
  )
}

export default ExpenseForm