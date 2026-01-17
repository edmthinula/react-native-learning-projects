import { StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import Button from './Button'

function ErrorOverlay ({ text , onConfirm}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error Occurred!</Text>
      <Text style={styles.text}>{text}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  )
}

export default ErrorOverlay

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700
  },
  text: {
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 14,
    color: 'white'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
})
