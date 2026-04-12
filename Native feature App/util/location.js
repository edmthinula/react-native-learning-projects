const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY
const CENTER_LOCATION = process.env.EXPO_PUBLIC_CENTER_LOCATION

export function getMapPreview (lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`
  return imagePreviewUrl
}
