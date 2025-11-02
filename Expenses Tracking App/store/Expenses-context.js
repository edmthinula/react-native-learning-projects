import React, { createContext, useMemo, useState } from 'react'
import { ExpensesData } from '../data/starting-data'

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: (expense) => {},
  deleteExpense: (id) => {},
  editExpense: (newExpense) => {}
})

const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(ExpensesData)

  function addExpense (expense) {
    setExpenses(prevExpenses => [...prevExpenses, expense])
  }

  function deleteExpense (id) {
    setExpenses(currentExpenses =>
      currentExpenses.filter(expense => expense.id !== id)
    )
  }

  function editExpense (newExpense) {
    setExpenses(currentExpenses =>
      currentExpenses.map(expense =>
        expense.id === newExpense.id ? { ...expense, ...newExpense } : expense
      )
    )
  }

  const value = useMemo(
    () => ({
      expenses,
      addExpense,
      deleteExpense,
      editExpense
    }),
    [expenses]
  )

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
}

export default ExpensesProvider
