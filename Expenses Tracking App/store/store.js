import { configureStore } from '@reduxjs/toolkit'
import expensesReducer from './Expenses'

export const store = configureStore({
  reducer: {
    expenses:expensesReducer
  },
})