const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY

export function getMapPreview (lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`
  return imagePreviewUrl
}

export async function getAddress (lat, lng) {
  const url = `https://geocode.googleapis.com/v4/geocode/location?location.latitude=${lat}&location.longitude=${lng}&key=${GOOGLE_API_KEY}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch address!')
  }
  const data = await response.json()
  if (!data.results || data.results.length === 0) {
    throw new Error('No address found for the provided coordinates!')
  }
  const address = data.results[0].formattedAddress
  return address
}
