import { View, Text, Pressable, StyleSheet, Platform } from 'react-native'
import Colors from '../../constants/colors'

function PrimaryButton ({ children, onPress, style }) {
  return (
    <View style={[styles.buttonOuterContainer, style]}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: Colors.primary600 }}
        style={({ pressed }) =>
          pressed
            ? [styles.pressed, styles.buttonInnercontainer]
            : styles.buttonInnercontainer
        }
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',
    elevation: Platform.OS === 'android' ? 2 : 0,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25
  },
  buttonInnercontainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  pressed: {
    opacity: 0.75
  }
})