export const formatDate = date => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Helper function: get a date 'n' days ago
export const daysAgo = n => {
  const date = new Date()
  date.setDate(date.getDate() - n)
  return formatDate(date)
}
