import axios from 'axios'

const BACKEND_URL = process.env.EXPO_PUBLIC_FIREBASE_REALTIME_DB

export async function storeExpense (expenseData) {
  const response = await axios.post(BACKEND_URL + '/expense.json', expenseData)
  const id = response.data.name
  return id
}

export async function fetchExpense () {
  const response = await axios.get(BACKEND_URL + '/expense.json')
  const expense = []
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      title: response.data[key].title,
      date: response.data[key].date
    }
    expense.push(expenseObj)
  }
  console.log(expense)
  return expense
}
