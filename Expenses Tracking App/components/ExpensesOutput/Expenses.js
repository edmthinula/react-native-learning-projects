import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import { useNavigation } from '@react-navigation/native'

const Expenses = ({ id, title, amount, date }) => {
  const navigation = useNavigation()
  /**
   * Navigate to the "Manage" screen for this expense.
   *
   * Passes the current expense's id as the `expenseId` navigation parameter.
   */
  function expensePressHandler () {
    navigation.navigate('Manage', {
      expenseId: id
    })
  }
  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
      android_ripple={{ color: GlobalStyles.colors.primary50 }}
    >
      <View style={styles.innerContainer}>
        <View>
          <Text style={[styles.title, styles.textBase]}>{title}</Text>
          <Text style={styles.textBase}>{date}</Text>
        </View>
        <View style={styles.amountBox}>
          <Text style={styles.amountTag}>{amount?.toFixed(2) || '0.00'}</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default Expenses

const styles = StyleSheet.create({
  innerContainer: {
    borderRadius: 6,
    elevation: 3,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500
  },
  amountBox: {
    backgroundColor: GlobalStyles.colors.primary50,
    paddingHorizontal: 12,
    textAlign: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    minWidth: 80
  },
  amountTag: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4
  },
  textBase: {
    color: GlobalStyles.colors.primary100
  },
  pressed: {
    opacity: 0.75
  }
})