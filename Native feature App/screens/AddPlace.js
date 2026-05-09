import PlaceForm from '../components/Places/PlaceForm'
import { insertPlace } from '../util/database'

function AddPlace ({ navigation }) {
async function createPlaceHandler(place) {
    try {
      await insertPlace(place);
      navigation.navigate('AllPlaces');
    } catch (error) {
      console.error("Could not save place:", error);
    }
  }
  return <PlaceForm onCreatePlace={createPlaceHandler} />
}

export default AddPlace
