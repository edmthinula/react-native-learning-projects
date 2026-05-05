import { StyleSheet, View, Alert, Image, Text } from 'react-native'
import OutlinedButton from '../UI/OutlinedButton'
import { Colors } from '../../constants/colors'
import { getCurrentPositionAsync, PermissionStatus } from 'expo-location'
import { useForegroundPermissions } from 'expo-location'
import { useEffect, useState } from 'react'
import { getMapPreview } from '../../util/location'
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native'

function LocationPicker ({ onPickedLocation, formData }) {
  const [pickedLocation, setPickedLocation] = useState()
  const navigation = useNavigation()
  const route = useRoute()
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions()
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng
      }
      setPickedLocation(mapPickedLocation)
    }
  }, [route, isFocused])

  useEffect(() => {
    if (pickedLocation) {
      onPickedLocation(pickedLocation)
    }
  }, [pickedLocation, onPickedLocation])

  async function verifyPermissions () {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission()
      return permissionResponse.granted
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant location permission to use this app.'
      )
      return false
    }
    return true
  }

  async function getLocationHandler () {
    const hasPermission = await verifyPermissions()
    if (!hasPermission) {
      return
    }
    const location = await getCurrentPositionAsync()
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude
    })
  }

  let locationPreview = <Text>no location picked yet.</Text>
  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
      />
    )
  }

  function pickOnMapHandler () {
    navigation.navigate('Map', { formData })
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton onPress={getLocationHandler} icon='location'>
          Locate User
        </OutlinedButton>
        <OutlinedButton onPress={pickOnMapHandler} icon='map'>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  )
}

export default LocationPicker

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    overflow: 'hidden'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4
  }
})
