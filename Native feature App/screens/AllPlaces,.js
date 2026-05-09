import { useIsFocused } from '@react-navigation/native'
import PlacesList from '../components/Places/PlacesList'
import { useEffect, useState } from 'react'
import { fetchPlaces } from '../util/database'

function AllPlaces ({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([])
  const isFocused = useIsFocused()
  useEffect(() => {
    async function loadPlaces () {
      try {
        const places = await fetchPlaces()
        setLoadedPlaces(places)
      } catch (error) {
        console.error('Could not fetch places', error)
      }
    }
    if (isFocused) {
      // setLoadedPlaces(curPlaces => [...curPlaces, route.params.place])
      loadPlaces()
    }
  }, [isFocused])
  return <PlacesList places={loadedPlaces} />
}

export default AllPlaces
