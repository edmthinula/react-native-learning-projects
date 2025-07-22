import { Text, View ,StyleSheet  } from 'react-native'
import Title from '../components/Title';
import { useState } from 'react';

function generateRandombetween(min,max,exclude){
    const rndNm = Math.floor(Math.random() * (max - min)) + min ;
    if (rndNm === exclude){
        return generateRandombetween(min,max,exclude);
    }else{
        return rndNm;
    }
}



function GameScreen ({userNumber}){
    const initialguess = generateRandombetween(1,100,userNumber)
    const [currentGuess,setCurrentGuess] = useState();

  return (
    <View style={styles.screen}>
        <Title>
            Opponent's Guess
        </Title>
        <Text>
            Guess
        </Text>
        <View>
            <Text>
                Higher or Lower ?
            </Text>
            {/* + - */}
        </View>
        <View>
            {/* LOG ROUNDS */}
        </View>
    </View>
  )
}

export default GameScreen;

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:24,
        marginTop:55
    },
    title:{
        fontSize: 18,
        fontWeight:'bold',
        color:'#ddb52f',
        textAlign:'center',
        borderWidth:2,
        borderColor:'#ddb52f'
    }
})