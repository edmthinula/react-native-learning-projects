class Place {
  constructor (title, imageUri, location) {
    this.title = title
    this.imageUri = imageUri
  
    if (location) {
      this.address = location.address || ''
      this.location = {
        lat: location.lat || null,
        lng: location.lng || null
      }
    } else {
      this.address = ''
      this.location = { lat: null, lng: null }
    }
    
    this.id = new Date().toString() + Math.random().toString()
  }
}

export default Place
