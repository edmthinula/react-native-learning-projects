import Expense from '../models/Expense'
import { formatDate } from '../util/date'

// Helper function: get a date 'n' days ago
const daysAgo = n => {
  const date = new Date()
  date.setDate(date.getDate() - n)
  return formatDate(date)
}

// Create dummy data dynamically
export const ExpensesData = [
  // 🚀 Expenses for 'Last 7 Days'
  new Expense(1, 'Coffee & Lunch', 15.5, formatDate(new Date())), // today
  new Expense(2, 'Grocery Shopping', 45.99, daysAgo(1)), // 1 day ago
  new Expense(3, 'Gas Refill', 60.0, daysAgo(4)), // 4 days ago
  new Expense(4, 'Movie Tickets', 24.0, daysAgo(7)), // 7 days ago

  // 🗓️ Expenses for 'Last 14 Days' (but not in last 7 days)
  new Expense(5, 'Book Purchase', 19.99, daysAgo(9)),
  new Expense(6, 'Electronics Charger', 35.5, daysAgo(12)),
  new Expense(7, 'Online Subscription', 9.99, daysAgo(14)),

  // 📅 Expenses for 'Last Month' (but not last 14 days)
  new Expense(8, 'Car Service', 250.0, daysAgo(21)),
  new Expense(9, 'Apartment Rent', 1200.0, daysAgo(30)),
  new Expense(10, 'Travel Insurance', 85.0, daysAgo(30)),

  // ❌ Expenses *outside* the 'Last Month' range (for testing exclusion)
  new Expense(11, 'Furniture Delivery', 50.0, daysAgo(60))
]
