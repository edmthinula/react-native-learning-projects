import { createSlice } from '@reduxjs/toolkit'
import { ExpensesData } from '../data/starting-data'

const initialState = {
  expenses: ExpensesData.map(exp => ({
    id: exp.id,
    title: exp.title,
    amount: exp.amount,
    date: exp.date
  }))
}
export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpenses: (state, action) => {
      state.expenses.push(action.payload)
    },
    deleteExpenses: (state, action) => {
      state.expenses = state.expenses.filter(
        expense => expense.id !== action.payload.id
      )
    },
    updateExpense: (state, action) => {
      const index = state.expenses.findIndex(
        expense => expense.id === action.payload.id
      )
      if (index >= 0) {
        state.expenses[index] = {
          ...state.expenses[index],
          ...action.payload
        }
      }
    }
  }
})

export const { addExpenses, deleteExpenses, updateExpense } =
  expensesSlice.actions

export default expensesSlice.reducer
