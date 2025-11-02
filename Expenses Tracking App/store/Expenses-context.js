import React, { createContext, useMemo, useReducer } from 'react'
import { ExpensesData } from '../data/starting-data'

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: (expense) => {},
  deleteExpense: (id) => {},
  updateExpense: (newExpense) => {}
})

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state]

    case 'UPDATE':
      return state.map(expense =>
        expense.id === action.payload.id
          ? { ...expense, ...action.payload }
          : expense
      )
    case 'DELETE':
      return state.filter(expense => expense.id !== action.payload)

    default:
      return state
  }
}

const ExpensesProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, ExpensesData)

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData })
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id })
  }

  function updateExpense(expenseData) {
    dispatch({ type: 'UPDATE', payload: expenseData })
  }

  const value = useMemo(
    () => ({
      expenses: expensesState,
      addExpense: addExpense,
      deleteExpense : deleteExpense,
      updateExpense : updateExpense
    }),
    [expensesState]
  )

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
}

export default ExpensesProvider
