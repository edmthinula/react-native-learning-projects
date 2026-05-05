import { useCallback, useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Colors } from '../../constants/colors'
import ImagePicker from './ImagePicker'
import LocationPicker from './LocationPicker'
import Button from '../UI/Button'
import { useRoute, useIsFocused } from '@react-navigation/native'

function PlaceForm () {
  const [enteredTitle, setEnteredTitle] = useState('')
  const [pickedLocation, setPickedLocation] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  const route = useRoute()
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused && route.params) {
      if (route.params.formData) {
        setEnteredTitle(route.params.formData.title || '')
        setSelectedImage(route.params.formData.image || '')
        setPickedLocation(route.params.formData.location || '')
      }
    }
  }, [route, isFocused])

  function changeTitleHandler (enteredTitle) {
    setEnteredTitle(enteredTitle)
  }
  const pickedLocationHandler = useCallback(location => {
    setPickedLocation(location)
  }, [])
  const takeImageHandler = useCallback(imageUri => {
    setSelectedImage(imageUri)
  }, [])
  function savePlaceHandler () {
    console.log(enteredTitle)
    console.log(selectedImage)
    console.log(pickedLocation)
  }
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker value={selectedImage} onImageTaken={takeImageHandler} />
      <LocationPicker 
        value={pickedLocation} 
        onPickedLocation={pickedLocationHandler}
        formData={{
          title: enteredTitle,
          image: selectedImage,
          location: pickedLocation
        }}
      />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  )
}

export default PlaceForm

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary700
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
    borderRadius: 10
  }
})
