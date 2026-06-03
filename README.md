# 📱 React Native Learning Projects

This repository contains a collection of **React Native apps** built while following a complete React Native course.  
Each app focuses on learning a new concept — from fundamentals to advanced topics like navigation, state management,low-level native device integration and security.
 
> Feel free to explore the projects as a comprehensive React Native learning resource.

---

## 🧱 Tech Stack

- **React Native (Expo)**
- **React Navigation** (Stack, Drawer, Tabs)
- **Zustand** (State Management & Persistence)
- **Redux Toolkit / Context API**
- **APIs** Firebase Auth/Realtime DB, Google Maps API, Google Geocoding API, Expo Push Notifications API
- **Tooling** Axios, Environment Variables (app.config.js), React Hooks
- **JavaScript (ES6+)**
- **React Hooks** (`useState`, `useEffect`, `useContext`, `useCallback`)
- **Database** SQLite (Modern Async API)
- **Native Modules** Expo Camera, Location, Image Picker, MapView, Expo Notifications, Expo Device

---

## 🧾 Development Summary

### 🔔 Push Notifications App (Latest)

*   **Local Notification Scheduling:** Configured local alerts to trigger after a custom delay (e.g., 5 seconds), carrying navigation data payloads.
    
*   **Remote Notification Flows:** Registered physical devices dynamically with Expo's servers using **Expo Push Tokens** and simulated remote delivery using HTTP POST calls to Expo's Push API (`https://exp.host/--/api/v2/push/send`).
    
*   **Deep Link Routing:** Leveraged incoming notification payloads to programmatically navigate from the Home screen to the User Profile screen on interaction, displaying dynamic transaction metrics (`userName`, `timestamp`).
    
*   **Notification Listeners:** Handled foreground notifications, background taps, and cold-starts using Expo's notification subscriptions (`addNotificationReceivedListener`, `addNotificationResponseReceivedListener`) and React Native hook `useLastNotificationResponse`.

---

### 📍 Native feature App

*   **Local SQLite Persistence:** Implemented a robust local storage solution using the modern **expo-sqlite Async API**, moving away from legacy callback-based transactions.
    
*   **Hardware Integration:**
    
    *   **Camera:** Integrated expo-image-picker with custom permission handling to capture high-quality photos.
        
    *   **Location:** Real-time GPS tracking using expo-location.
        
*   **Interactive Maps:** Full integration of react-native-maps allowing users to pick locations via a map interface or current GPS position.
    
*   **Reverse Geocoding:** Custom implementation of the **Google Geocoding API** to translate coordinates into human-readable addresses.
    
*   **Advanced Navigation Flow:** Managed complex state persistence using navigation parameters to prevent data loss when switching between the form and the map.

### 🔐 Auth App
- Implemented **Firebase Authentication** for secure login and signup.
- Managed global auth state using **Zustand**.
- Integrated **Zustand Persist middleware** with **AsyncStorage** to maintain user sessions across app restarts.
- Handled API tokens and authentication flow using **Axios**.

---

### 💰 Expense Tracker App
- Integrated **Firebase Realtime DB** for data persistence.
- Used **Axios** for handling REST API requests (GET, POST, PUT, DELETE).
- Implemented **Loading & Error overlays** for better User Experience.
- Managed complex asynchronous state within the **Context API**.

---

### 🍴 Meals App
- Built core UI with **grid layout** and **meal detail screens**.
- Implemented **Context API** for favorite meal management.
- Created **Redux branch** for alternate state management approach.
- Added nested navigators (**Stack + Drawer + Tabs**).
- Refactored UI into reusable components for better structure.

---

### 🧭 Navigators App
- Implemented **Stack Navigator** and added **Drawer Navigation**.
- Styled drawer content and learned navigation configuration options.
- Experimented with **Bottom Tab Navigator**.
- Learned about **nested navigators** and screen hierarchy setup.

---

### 🎮 Opponent’s Guess App
- Implemented complete game logic with random number generation.
- Added portrait and landscape layouts using `useWindowDimensions`.
- Implemented platform-specific UI rendering.
- Added “Game Over” screen with round tracking.

---

### ✅ Goals App
- Created basic add/remove goal functionality.
- Learned about props, lists, and handling user input.
- Understood state management basics with `useState`.

---

## 🧠 Learning Objectives

- Learn **React Native fundamentals** from scratch.
- Understand **navigation and screen structuring** in React Native.
- Explore **multiple state management techniques** (Context API, Redux, and Zustand).
- Implement **Secure Authentication** and persistent user sessions.
- Build **modular, maintainable, and responsive UI components**.
- Prepare the codebase for **open-source contribution** and **portfolio showcasing**.
*   **Device Hardware:** Mastering access to the Camera, Gallery, and GPS.
*   **Native Persistence:** Understanding the lifecycle of local SQL databases on mobile devices.
*   **Async Patterns:** Implementing modern async/await patterns for database and API synchronization.
*   **Permission Management:** Building graceful fallbacks for system permissions (Camera, Location).
*   **Push Notifications:** Understanding foreground, background, and killed state notification lifecycles.
*   **Deep Link Routing:** Handling custom notification payloads to dynamically route users to specific app screens (e.g., deep linking).

---

## 🌿 Branch Structure

| Branch | Description |
|--------|--------------|
| [`main`](https://github.com/edmthinula/React_Native_Apps/commits/master) | Contains Context/Zustand–based implementations. |
| [`redux`](https://github.com/edmthinula/React_Native_Apps/commits/redux-for-handle-favorite-meal-ids-across-app) | Contains Redux Toolkit–based implementation for the Meals App. |

---

## 🏗️ Project Status

🏁 **Completed** — 100% of the learning course and apps are implemented, styled, and tested.

---

## 📜 License

This project is open-source and licensed under the **MIT License**. Feel free to use the code for learning or personal projects.

---

## 💬 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a pull request if you want to improve any of the applications or add comments/documentation.

---

### ⭐ If you like this learning journey, don’t forget to star the repo!
