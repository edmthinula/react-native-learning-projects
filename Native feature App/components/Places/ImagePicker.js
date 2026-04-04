import { Alert, Button, Image, StyleSheet, View, Text } from 'react-native'
import { Colors } from '../../constants/colors'
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus
} from 'expo-image-picker'
import { useState } from 'react'
import OutlinedButton from '../UI/OutlinedButton'

function ImagePicker () {
  const [pickedImage, setPickedImage] = useState()
  const [cameraPermissionStatus, requestPermission] = useCameraPermissions()
  async function verifyPermissions () {
    console.log(cameraPermissionStatus.status)
    if (cameraPermissionStatus.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission()
      return permissionResponse.granted
    }
    if (cameraPermissionStatus.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permission to use this app.'
      )
      return false
    }
    return true
  }
  async function takeImageHandler () {
    const hasPermission = await verifyPermissions()
    if (!hasPermission) {
      return
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    })
    setPickedImage(image.assets[0].uri)
  }
  let imagePreview = <Text>No image taken yet.</Text>
  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />
  }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton onPress={takeImageHandler} icon="camera" > Take Image</OutlinedButton>
    </View>
  )
}

export default ImagePicker

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100
  },
  image: {
    width: '100%',
    height: '100%',borderRadius:15,overflow:'hidden'
  }
})
