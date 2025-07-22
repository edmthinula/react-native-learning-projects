import { View, Text, Pressable, StyleSheet } from 'react-native'
import  Colors  from '../../constants/colors'


function PrimaryButton ({ children ,onPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        onPress={onPress}
        android_ripple={Colors.peimary600}
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
    backgroundColor: Colors.primary500,
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
