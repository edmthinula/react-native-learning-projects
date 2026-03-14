import axios from 'axios'
import { Methods } from '../constants/auth'
const WEB_API_KEY = process.env.EXPO_PUBLIC_FIREBASE_WEB_API_KEY
const BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts'

async function authenticate (mode, email, password) {
  const response = await axios.post(`${BASE_URL}:${mode}?key=${WEB_API_KEY}`, {
    email: email,
    password: password,
    returnSecureToken: true
  })
  console.log(response)
}
export async function createUser (email, password) {
  await authenticate(Methods.signUp, email, password)
}

export async function login (email, password) {
  await authenticate(Methods.signIn, email, password)
}
