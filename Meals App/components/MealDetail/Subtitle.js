import { View , Text , StyleSheet } from 'react-native'

const Subtitle = ({children}) => {
  return (
    <View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>{children}</Text>
      </View>
    </View>
  )
}

export default Subtitle

const styles = StyleSheet.create({
      subtitle: {
    color: '#e2b497',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 4,
    padding: 6,
    textAlign: 'center'
  },
  subtitleContainer: {
    marginVertical: 4,
    padding: 6,
    marginHorizontal: 12,
    borderBottomColor: '#e2b497',
    borderBottomWidth: 2
  }
})