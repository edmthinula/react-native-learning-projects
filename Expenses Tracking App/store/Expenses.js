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
    }
  }
})

export const { addExpenses, deleteExpenses } = expensesSlice.actions

export default expensesSlice.reducer
