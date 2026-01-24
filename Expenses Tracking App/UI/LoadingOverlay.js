import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../constants/styles'

function LoadingOverlay ({text}) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='white' />
      <Text style={styles.text}>
        {text}
      </Text>
    </View>
  )
}

export default LoadingOverlay

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700
  },
  text:{
    color:'white',
    fontSize:20
  }
})
