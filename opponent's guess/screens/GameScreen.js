import { Text, View, StyleSheet, Alert, FlatList} from 'react-native'
import Title from '../components/ui/Title'
import { useEffect, useState } from 'react'
import PrimaryButton from '../components/ui/PrimaryButton'
import NumberContainer from '../components/game/NumberContainer'
import Card from '../components/ui/Card'
import InstructionText from '../components/ui/InstructionText'
import { Ionicons } from '@expo/vector-icons'
import GuessLogItem from '../components/game/GuessLogItem'

function generateRandombetween (min, max, exclude) {
  const rndNm = Math.floor(Math.random() * (max - min)) + min
  if (rndNm === exclude) {
    return generateRandombetween(min, max, exclude)
  } else {
    return rndNm
  }
}

function GameScreen ({ userNumber, onGameOver }) {
  const initialguess = generateRandombetween(1, 100, userNumber)
  const [currentGuess, setCurrentGuess] = useState(initialguess)
  const [guessesNumber, setGuessesNumber] = useState([])
  const [minBoundry, setMinBoundry] = useState(1)
  const [maxBoundry, setMaxBoundry] = useState(100)

  useEffect(() => {
    if (currentGuess == userNumber) {
      onGameOver(guessesNumber.length)
    }
  }, [currentGuess, userNumber, onGameOver])

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
    
    let newMinBoundry = minBoundry
    let newMaxBoundry = maxBoundry
    
    if (direction === 'lower') {
      newMaxBoundry = currentGuess
      setMaxBoundry(currentGuess)
    } else {
      newMinBoundry = currentGuess + 1
      setMinBoundry(currentGuess + 1)
    }
    
    const newGuessesNumber = [...guessesNumber, currentGuess]
    setGuessesNumber(newGuessesNumber)
    
    let newRndNumber
    do {
      newRndNumber = generateRandombetween(newMinBoundry, newMaxBoundry, currentGuess)
    } while (newGuessesNumber.includes(newRndNumber))
    
    setCurrentGuess(newRndNumber)
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.istructiontext}>
          Higher or Lower ?
        </InstructionText>
        <View
          style={{ width: '100%', alignItems: 'center', flexDirection: 'row' }}
        >
          <PrimaryButton
            style={{ width: '47%', marginTop: 10 }}
            onPress={nextGuessHandler.bind(this, 'lower')}
          >
            <Ionicons name='remove' size={24} color={'white'} />
          </PrimaryButton>

          <PrimaryButton
            style={{ width: '47%', marginTop: 10 }}
            onPress={nextGuessHandler.bind(this, 'greater')}
          >
            <Ionicons name='add' size={24} color={'white'} />
          </PrimaryButton>
        </View>
      </Card>
      <FlatList
        data={guessesNumber}
        alwaysBounceVertical={false}
        renderItem={itemData => (
          <GuessLogItem
            roundNumber={guessesNumber.length - itemData.index}
            guess={itemData.item}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View>{/* LOG ROUNDS */}</View>
    </View>
  )
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    marginTop: 55,
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ddb52f',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#ddb52f'
  },
  istructiontext: {
    marginBottom: 10
  },
  listContainer: {
    flex: 1
  }
})