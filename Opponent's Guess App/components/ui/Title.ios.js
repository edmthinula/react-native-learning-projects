import { Text, StyleSheet, Platform } from 'react-native'
import Colors from '../../constants/colors'

function Title ({ children }) {
  return <Text style={styles.title}>{children}</Text>
}

export default Title

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 24,
    textAlign: 'center',
    // borderWidth: Platform.OS === 'android' ? 2 : 0,
    borderWidth: 0,
    borderColor: Colors.accent500,
    color: 'white',
    padding: 10,
    maxWidth: '80%',
    width: 300
  }
})
