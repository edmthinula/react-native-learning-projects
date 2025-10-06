import { Text, View, StyleSheet } from 'react-native'

const MealsOverviewScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MealsOverviewScreen</Text>
    </View>
  )
}

export default MealsOverviewScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:16
    }
})
