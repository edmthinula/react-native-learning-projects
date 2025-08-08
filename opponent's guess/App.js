import { LinearGradient } from 'expo-linear-gradient'
import { use, useState } from 'react'
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import Colors from './constants/colors'
import GameOverScreen from './screens/GameOverScreen'
export default function App () {
  const [usernumber, setUserNumber] = useState()
  const [gameIsOver, setGameIsOver] = useState(false)

  function pickedNumberHandler (pickedNumber) {
    setUserNumber(pickedNumber)
  }

  function onGameOver () {
    setGameIsOver(true)
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

  if (usernumber) {
    screen = <GameScreen userNumber={usernumber} onGameOver={onGameOver} />
  }
  if (gameIsOver) {
    screen = <GameOverScreen />
  }

  return (
    <LinearGradient
      style={styles.rootScreen}
      colors={[Colors.primary400, Colors.accent500]}
    >
      <ImageBackground
        source={require('./assets/background.jpg')}
        resizeMethod='cover'
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  },
  backgroundImage: {
    opacity: 0.3
  }
})
