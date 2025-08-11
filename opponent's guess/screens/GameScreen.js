import { Text, View, StyleSheet, Alert, FlatList } from 'react-native'
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
let guessesNumber = []
let minBoundry = 1
let maxBoundry = 100

function GameScreen ({ userNumber, onGameOver }) {
  const initialguess = generateRandombetween(1, 100, userNumber)
  const [currentGuess, setCurrentGuess] = useState(initialguess)

  useEffect(() => {
    if (currentGuess == userNumber) {
      onGameOver(guessesNumber.length)
    }
  }, [currentGuess])

  useEffect(() => {
    (guessesNumber = []), (minBoundry = 1), (maxBoundry = 100)
  }, [])

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
      {/* <PrimaryButton onPress={() => setCurrentGuess(userNumber)}>
        had enough
      </PrimaryButton> */}
      <FlatList
        data={guessesNumber}
        alwaysBounceVertical={false}
        renderItem={itemData => <GuessLogItem roundNumber = {guessesNumber.length - itemData.index} guess = {itemData.item} /> }
        keyExtractor={(item)=>{
          return item
        }}
      />
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
  },
  istructiontext: {
    marginBottom: 10
  },
  listContainer:{
    flex:1
  }
})
