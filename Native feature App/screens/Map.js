import { StyleSheet, View, Alert } from 'react-native'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import IconButton from '../components/UI/IconButton'
import { useRoute } from '@react-navigation/native'

function Map ({ navigation }) {
  const route = useRoute()

  const initialLocation = route.params.initialLat &&
    route.params.initialLng && {
      lat: route.params.initialLat,
      lng: route.params.initialLng
    }
  const [selectedLocation, setSelectedLocation] = useState(initialLocation)

  const region = {
    latitude: initialLocation
      ? initialLocation.lat
      : parseFloat(process.env.EXPO_PUBLIC_CENTER_LATITUDE || '7.0873'),
    longitude: initialLocation
      ? initialLocation.lng
      : parseFloat(process.env.EXPO_PUBLIC_CENTER_LONGITUDE || '79.9925'),
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }

  function selectLocationHandler (event) {
    if (initialLocation){
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude
    const lng = event.nativeEvent.coordinate.longitude
    setSelectedLocation({ lat: lat, lng: lng })
  }

  const savedPickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No location picked!',
        'You have to pick a location (by tapping on the map) first!'
      )
      return
    }
    navigation.navigate('AddPlace', {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
      formData: route.params?.formData
    })
  }, [navigation, selectedLocation, route.params])

  useLayoutEffect(() => {
    if (initialLocation) {
      return
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon='save'
          size={24}
          color={tintColor}
          onPress={savedPickedLocationHandler}
        />
      )
    })
  }, [navigation, savedPickedLocationHandler, initialLocation])

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        zoomEnabled={true}
        scrollEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        loadingEnabled={true}
        loadingIndicatorColor='#00ff00'
        onMapReady={() => {}}
        onMapLoaded={() => {}}
        onRegionChangeComplete={() => {}}
        onRegionChange={() => {}}
        onPress={selectLocationHandler}
        onLongPress={() => {}}
        onError={error => {
          Alert.alert('🔴 Map Error', JSON.stringify(error))
        }}
        onTilesLoaded={() => {}}
      >
        {selectedLocation && (
          <Marker
            title='Picked location'
            coordinate={{
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng
            }}
          />
        )}
      </MapView>
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: '100%',
    height: '100%'
  }
})
