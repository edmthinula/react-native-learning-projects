import { View, Text, Pressable, StyleSheet } from 'react-native'


function PrimaryButton ({ children ,onPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: '#915773ff' }}
        style={({pressed}) => pressed ? [styles.pressed,styles.buttonInnercontainer] :   styles.buttonInnercontainer}
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
    elevation: 3,
    width:'47%'
  },
  buttonInnercontainer: {
    backgroundColor: '#72053c',
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  pressed:{
    opacity:0.75
  }
})
