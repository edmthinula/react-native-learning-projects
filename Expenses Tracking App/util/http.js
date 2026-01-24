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
  if (!response.data) {
    return expense
  }
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      title: response.data[key].title,
      date: response.data[key].date
    }
    expense.push(expenseObj)
  }
  return expense
}
export function updateExpense (id, expenseData) {
  return axios.put(BACKEND_URL + `/expense/${id}.json`, expenseData)
}

export function deleteExpense (id) {
  return axios.delete(BACKEND_URL + `/expense/${id}.json`)
}
