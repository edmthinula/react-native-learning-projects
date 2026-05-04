import { StyleSheet, View, Alert } from 'react-native'
import { useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'

function Map () {
  useEffect(() => {
    return () => {}
  }, [])

  const region = {
    latitude: parseFloat(process.env.EXPO_PUBLIC_CENTER_LATITUDE || '7.0873'),
    longitude: parseFloat(process.env.EXPO_PUBLIC_CENTER_LONGITUDE || '79.9925'),
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }

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
        loadingIndicatorColor="#00ff00"
        onMapReady={() => {}}
        onMapLoaded={() => {}}
        onRegionChangeComplete={() => {}}
        onRegionChange={() => {}}
        onPress={() => {}}
        onLongPress={() => {}}
        onError={(error) => {
          Alert.alert('🔴 Map Error', JSON.stringify(error))
        }}
        onTilesLoaded={() => {}}
      ></MapView>
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  }
})
