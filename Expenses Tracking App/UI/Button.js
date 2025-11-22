import { Pressable, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../constants/styles'

const Button = ({ children, onPress, mode, style }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          mode === 'flat' && styles.flat,
          pressed && styles.pressed
        ]}
      >
        <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>
          {children}
        </Text>
      </Pressable>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    backgroundColor: GlobalStyles.colors.primary500,
    padding: 8
  },
  flat: {
    backgroundColor: 'transparent'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  flatText: {
    color: GlobalStyles.colors.primary200
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4
  }
})
