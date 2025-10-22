import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from './favorites'

const store = configureStore({
  reducer: {
    favoritesMeals: favoritesReducer
  }
})

export default store
