import { createContext, useMemo, useReducer } from 'react'
import { ExpensesData } from '../data/starting-data'

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: expense => {},
  setExpenses: expense => {},
  deleteExpense: id => {},
  updateExpense: newExpense => {}
})

/**
 * Reducer that applies 'ADD', 'UPDATE', and 'DELETE' actions to an array of expenses.
 * @param {Array<Object>} state - Current array of expense objects.
 * @param {Object} action - Action to apply.
 * @param {string} action.type - One of `'ADD'`, `'UPDATE'`, or `'DELETE'`.
 * @param {Object|number} action.payload - Action payload:
 *   - For `'ADD'`: an expense object to prepend.
 *   - For `'UPDATE'`: an expense object containing an `id` and fields to merge into the existing expense.
 *   - For `'DELETE'`: the `id` of the expense to remove.
 * @returns {Array<Object>} The updated array of expenses.
 */
function expensesReducer (state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state]
    case 'SET':
      return [...action.payload].reverse()
    case 'UPDATE':
      return state.map(expense =>
        expense.id === action.payload.id
          ? {
              id: expense.id,
              title: action.payload.title ?? expense.title,
              amount: action.payload.amount ?? expense.amount,
              date: action.payload.date ?? expense.date
            }
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

  /**
   * Add a new expense to the expenses state.
   * @param {Object} expenseData - Expense object containing the fields expected by the reducer (for example: id, amount, description, date).
   */
  function addExpense (expenseData) {
    dispatch({ type: 'ADD', payload: expenseData })
  }

  function setExpenses (expenses) {
    dispatch({ type: 'SET', payload: expenses })
  }

  /**
   * Remove the expense with the given id from state.
   * @param {string} id - The id of the expense to remove.
   */
  function deleteExpense (id) {
    dispatch({ type: 'DELETE', payload: id })
  }

  /**
   * Update an existing expense in the context state by merging fields from the provided expense object.
   * @param {{ id: string, [key: string]: any }} expenseData - Expense object containing an `id` that identifies the expense to update and the fields to replace or add.
   */
  function updateExpense (expenseData) {
    dispatch({ type: 'UPDATE', payload: expenseData })
  }

  const value = useMemo(
    () => ({
      expenses: expensesState,
      addExpense: addExpense,
      deleteExpense: deleteExpense,
      updateExpense: updateExpense,
      setExpenses: setExpenses
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
