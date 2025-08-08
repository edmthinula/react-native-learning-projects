import { Text, View, StyleSheet, Alert } from 'react-native'
import Title from '../components/ui/Title'
import { useEffect, useState } from 'react'
import PrimarButton from '../components/ui/PrimaryButton'
import NumberContainer from '../components/game/NumberContainer'

function generateRandombetween (min, max, exclude) {
  const rndNm = Math.floor(Math.random() * (max - min)) + min
  if (rndNm === exclude) {
    return generateRandombetween(min, max, exclude)
  } else {
    return rndNm
  }
}

function GameScreen ({ userNumber, onGameOver }) {
  let minBoundry = 1
  let maxBoundry = 100
  const initialguess = generateRandombetween(1, 100, userNumber)
  const [currentGuess, setCurrentGuess] = useState(initialguess)

  let guessesNumber = []

  useEffect(() => {
    if (currentGuess == userNumber) {
      onGameOver()
    }
  }, [currentGuess])

  function nextGuessHandler (direction) {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong ....', [
        { text: 'Sorry', style: 'Cancel' }
      ])
      return
    }
    if (direction === 'lower') {
      maxBoundry = currentGuess
    } else {
      minBoundry = currentGuess + 1
    }
    guessesNumber.push(currentGuess)
    let newRndNumber
    do {
      newRndNumber = generateRandombetween(minBoundry, maxBoundry, currentGuess)
    } while (guessesNumber.includes(newRndNumber))
    setCurrentGuess(newRndNumber)
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or Lower ?</Text>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <PrimarButton
            style={{ width: '90%', marginTop: 10 }}
            onPress={nextGuessHandler.bind(this, 'lower')}
          >
            -
          </PrimarButton>

          <PrimarButton
            style={{ width: '90%', marginTop: 10 }}
            onPress={nextGuessHandler.bind(this, 'greater')}
          >
            +
          </PrimarButton>
        </View>
      </View>
      <View>{/* LOG ROUNDS */}</View>
    </View>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    marginTop: 55
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ddb52f',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#ddb52f'
  }
})
