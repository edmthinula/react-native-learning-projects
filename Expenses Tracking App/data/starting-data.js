import Expense from '../models/Expense'


// A helper function to create a date string in 'YYYY-MM-DD' format
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Get today's date
const today = new Date(); // Using a fixed date for consistent dummy data

// --- Dates for Filtering ---

// 1. Last 7 Days (Today to 7 days ago)
const sevenDaysAgo = new Date(today);
sevenDaysAgo.setDate(today.getDate() - 7); // October 19, 2025

// 2. Last 14 Days (Today to 14 days ago)
const fourteenDaysAgo = new Date(today);
fourteenDaysAgo.setDate(today.getDate() - 14); // October 12, 2025

// 3. Last Month (Today to ~30 days ago)
const oneMonthAgo = new Date(today);
oneMonthAgo.setDate(today.getDate() - 30); // September 26, 2025

// --- Dummy Data Array ---

export const ExpensesData = [
  // 🚀 Expenses for 'Last 7 Days' filter
  new Expense(
    1,
    'Coffee & Lunch',
    15.50,
    formatDate(new Date(today)) // Today's date (Oct 26)
  ),
  new Expense(
    2,
    'Grocery Shopping',
    45.99,
    formatDate(new Date('2025-10-25')) // 1 day ago
  ),
  new Expense(
    3,
    'Gas Refill',
    60.00,
    formatDate(new Date('2025-10-22')) // 4 days ago
  ),
  new Expense(
    4,
    'Movie Tickets',
    24.00,
    formatDate(new Date('2025-10-19')) // 7 days ago (on the border)
  ),

  // 🗓️ Expenses for 'Last 14 Days' filter (but *not* the last 7 days)
  new Expense(
    5,
    'Book Purchase',
    19.99,
    formatDate(new Date('2025-10-17')) // 9 days ago
  ),
  new Expense(
    6,
    'Electronics Charger',
    35.50,
    formatDate(new Date('2025-10-14')) // 12 days ago
  ),
  new Expense(
    7,
    'Online Subscription',
    9.99,
    formatDate(new Date('2025-10-12')) // 14 days ago (on the border)
  ),

  // 📅 Expenses for 'Last Month' filter (but *not* the last 14 days)
  new Expense(
    8,
    'Car Service',
    250.00,
    formatDate(new Date('2025-10-05')) // ~3 weeks ago
  ),
  new Expense(
    9,
    'Apartment Rent',
    1200.00,
    formatDate(new Date('2025-09-30')) // ~4 weeks ago
  ),
  new Expense(
    10,
    'Travel Insurance',
    85.00,
    formatDate(new Date('2025-09-26')) // 30 days ago (on the border)
  ),

  // ❌ Expenses *outside* the 'Last Month' range (for testing exclusion)
  new Expense(
    11,
    'Furniture Delivery',
    50.00,
    formatDate(new Date('2025-09-01')) // Way outside the range
  ),
];

// Note: You must ensure your `Expense` class is imported or defined
// before using this array.

/*
// Example of how to use this data with your class:
import Expense from './Expense'; // Assuming your class is in a file named Expense.js

// Now you can use the dummyExpenses array
console.log(dummyExpenses);
*/