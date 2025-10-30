import { Platform, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

const Expenses = ({ id, title, price, expireDate }) => {
  return (
    <View key={id} style={styles.expense}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text>{expireDate}</Text>
        </View>
        <View style={styles.priceBox}>
          <Text style={styles.priceTag}>{price}</Text>
        </View>
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
    backgroundColor: GlobalStyles.colors.primary200
  },
  innerContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:15
  },
  priceBox: {
    backgroundColor: GlobalStyles.colors.primary50,
    textAlign: 'center',
    alignItems:'center',
    paddingVertical:10,
    borderRadius: 10,
    width:'25%'
  },
  priceTag:{
    fontSize:17,
    fontWeight:'bold'
  },
  title:{
    fontWeight:'bold',
    fontSize:17
  }
})
