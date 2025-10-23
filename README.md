# 📱 React Native Apps

This repository contains multiple **React Native apps** built while learning React Native from scratch.  
Each folder represents an individual project developed step-by-step by following a React Native course.

> ⚙️ Currently in private mode — will be made public once all apps and features are completed and polished for open-source use.

---

## 🗂️ Repository Structure

| App Name | Description | Status |
|-----------|--------------|---------|
| **Goals App** | Basic CRUD app for adding and removing goals. Introduced fundamental React Native concepts like components, state, and styling. | ✅ Completed |
| **Opponent's Guess App** | Number guessing game where the phone guesses the user's number. Focused on logic, layout adaptation, and platform-specific components. | ✅ Completed |
| **Navigators App** | Demo app to learn **React Navigation** including Stack, Drawer, and Bottom Tabs. | 🧠 Learning |
| **Meals App** | A complete app demonstrating **navigation, reusable UI components, and state management** using both Context API and Redux. | 🚧 In Progress |

---

## 🧩 Meals App — State Management Implementations

The **Meals App** is being used to explore different state-management approaches in React Native.

| Branch | Approach | Description |
|---------|-----------|-------------|
| `master` | **React Context API** | Uses Context API to store favorite meal IDs and display them in the Favorites screen. |
| `redux-for-handle-favorite-meal-ids-acorss-app` | **Redux Toolkit** | Alternative Redux implementation for managing favorite meals across the app, created purely for learning purposes. |

### 🧭 How to Try Redux Version

```bash
git clone https://github.com/<your-username>/React_Native_Apps.git
cd React_Native_Apps/Meals\ App
git checkout redux-for-handle-favorite-meal-ids-acorss-app
npm install
npx expo start
