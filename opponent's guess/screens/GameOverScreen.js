import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  useWindowDimensions
} from 'react-native'
import Title from '../components/ui/Title'
import Colors from '../constants/colors'
import PrimaryButton from '../components/ui/PrimaryButton'

function GameOverScreen ({ roundsNumber, userNumber, onStartNewGame }) {
  const { width, height } = useWindowDimensions()
  let imageSize = 300
  if (width < 380) {
    imageSize = 150
  }
  if (height < 500) {
    imageSize = 80
  }
  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2
  }

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>Game Over!</Title>
        <View style={[styles.imageConatainer, imageStyle]}>
          <Image
            style={styles.image}
            source={require('../assets/images/success.png')}
          />
        </View>
        <Text style={styles.summaryText}>
          Your phone needed
          <Text style={styles.highlight}> {roundsNumber} </Text>
          rounds to gues the number
          <Text style={styles.highlight}> {userNumber} </Text>.
        </Text>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  )
}

export default GameOverScreen

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageConatainer: {
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    margin: 36
  },
  image: {
    width: '100%',
    height: '100%'
  },
  summaryText: {
    fontSize: 24,
    fontFamily: 'open-sans',
    textAlign: 'center',
    marginBottom: 24
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500
  },
  screen: {
    flex: 1,
    marginTop: 40
  }
})
