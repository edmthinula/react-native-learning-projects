import { LinearGradient } from 'expo-linear-gradient'
import { useState , useEffect } from 'react'
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native'
import { Platform, StatusBar } from 'react-native'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import Colors from './constants/colors'
import GameOverScreen from './screens/GameOverScreen'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

export default function App () {
  const [usernumber, setUserNumber] = useState()
  const [gameIsOver, setGameIsOver] = useState(false)
  const [guessRounds,setGuessRounds] = useState(0)

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  function pickedNumberHandler (pickedNumber) {
    setUserNumber(pickedNumber)
  }

  function onGameOver (guessRounds) {
    setGameIsOver(true)
    setGuessRounds(guessRounds)
  }

  function startNewGameHandler(){
    setUserNumber(null);
    setGuessRounds(0);
    setGameIsOver(false);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

  if (usernumber) {
    screen = <GameScreen userNumber={usernumber} onGameOver={onGameOver} />
  }
  if (gameIsOver) {
    screen = <GameOverScreen  userNumber={usernumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler}/>
  }

  return (
    <LinearGradient
      style={styles.rootScreen}
      colors={[Colors.primary400, Colors.accent500]}
    >
      <ImageBackground
        source={require('./assets/images/background.jpg')}
        resizeMethod='cover'
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView
          style={[
            styles.rootScreen,
            {
              paddingTop:
                Platform.OS === 'android' ? StatusBar.currentHeight : 0
            }
          ]}
        >
          {screen}
        </SafeAreaView>
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
