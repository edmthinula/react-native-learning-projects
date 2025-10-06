import { Pressable, View, Text, StyleSheet } from 'react-native'

const CategoryGridTile = ({ title, color }) => {
  return (
    <View style={styles.griditem}>
      <Pressable style={styles.button}>
        <View style={styles.innerContainer}>
          <Text>{title}</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default CategoryGridTile

const styles = StyleSheet.create({
  griditem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    shadowColor :'black',
    shadowOpacity : 0.25,
    shadowOffset : {width : 0 , height : 2},
    shadowRadius : 8
  },
  button: { flex: 1 },
  innerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
