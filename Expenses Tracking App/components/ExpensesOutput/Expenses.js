import { Platform, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

const Expenses = ({ id, title, price, expireDate }) => {
  return (
    <View key={id} style={styles.expense}>
      <View style={styles.innerContainer}>
        <Text>{title}</Text>
        <Text>{price}</Text>
        <Text>{expireDate}</Text>
      </View>
    </View>
  )
}

export default Expenses

const styles = StyleSheet.create({
  expense: {
    margin: 16,
    borderRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    backgroundColor: GlobalStyles.colors.accent500
  },
    innerContainer: {
    borderRadius: 8,
    overflow: 'hidden'
  },
})
