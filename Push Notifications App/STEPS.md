# Push Notifications & Deep Link Routing Guide

This guide summarizes the current implementation of our Expo React Native Push Notifications application, explains how to set it up, how to run the project, and how to test the notification and routing flows.

---

## 📱 Project Overview & Completed Work

We have built a fully featured push notifications demo using Expo (SDK 54) and React Native. The app implements both **Local Scheduled Notifications** and **Remote Push Notifications** with automatic deep-link routing.

### Key Implemented Features
1. **Push Token Registration**: 
   - Requests user permission to receive push notifications.
   - Automatically retrieves the **Expo Push Token** using the configured EAS project ID.
2. **Notification Event Listeners**:
   - **Foreground Listener**: Handles notifications that arrive while the app is active and running.
   - **Background/Killed State Listener**: Catches user taps on notification banners when the app is in the background or completely terminated using `useLastNotificationResponse` and routes the user accordingly.
3. **Deep Link Routing**:
   - Evaluates the notification's data payload (`data.screen`).
   - Dynamically navigates the user from the **Home** screen to the **User Profile** screen when a notification is clicked, transferring custom payload data (e.g., `userName` and `timestamp`).
4. **Local Demo Trigger**:
   - Includes a "Schedule Notification" action that schedules a local notification to trigger 5 seconds later with a custom deep-link routing payload.
5. **Direct Remote Trigger**:
   - Includes a "Send Push Notification" action which executes a POST request directly to Expo's Push Notification Service API (`https://exp.host/--/api/v2/push/send`) to send a remote push back to the device.
6. **Native Android Integration**:
   - The native `android` folder is generated on demand via `expo prebuild` / `expo run:android` (it is not committed to the repo)`.
   - If you need Firebase/FCM integration, provide your own `google-services.json` locally (don't commit it) and configure `app.json` accordingly.

---

## 🛠️ Environment Setup

Before running the application, make sure your environment is configured.

### 1. Install Dependencies
Ensure all npm packages are installed:
```bash
cd "Push Notifications App"
npm install
```

### 2. Expo / EAS Configuration
The project is configured under the owner account `thinula_native` with the EAS project ID `95b4021a-01fc-488c-9451-6acda8e6142c` in `app.json`.
- If you need to log in to your Expo account, run:
  ```bash
  npx expo login
  ```

### 3. Firebase Configuration (`google-services.json`)
For push notifications to function correctly on Android, the build requires a `google-services.json` file.
- **Required Location**: Place your downloaded `google-services.json` from the Firebase Console in the **root** of the project directory (i.e. `./google-services.json`).
- **If you do not have Firebase config yet**:
  If you are just developing/testing the UI or local scheduled notifications, you will need to remove the `"googleServicesFile": "./google-services.json"` line from `app.json` to prevent build/prebuild errors. Note that doing so will disable remote push notification support for Android.

---

## 🚀 Running the Application

Because push notifications (specifically remote push notifications via FCM/APNs) require native APIs, you should run the application on a **physical device** or a **native build** rather than standard Expo Go in an emulator.

### Option A: Running the Native Android App (Recommended)
This uses the prebuilt native folder and compiles the application directly on your device/emulator.

1. Connect your physical Android device via USB (with USB Debugging enabled) or start an Android Emulator.
2. Run the command:
   ```bash
   npm run android
   ```
   *This starts the Expo bundler and builds/installs the native debug app on your device.*

### Option B: Running via Expo Go (Development)
> [!WARNING]
> While local scheduled notifications work in Expo Go, remote push notifications might require a physical device and native credentials.

1. Start the Expo bundler:
   ```bash
   npm start
   ```
2. Scan the QR code using the **Expo Go** app on your physical device.

---

## 🧪 Testing Workflows

Use the following step-by-step procedures to verify that notification delivery and screen routing are functioning correctly.

### Workflow 1: Local Scheduling & Deep Link Routing (Fast Demo)
This workflow tests the background routing logic locally without needing external API requests.

1. Open the app on your device (you should see the **NotifyMe** Home screen).
2. Allow notification permissions if prompted.
3. Tap **Schedule Notification**.
4. Immediately press the home button on your device to send the app to the **background** (or lock your phone).
5. Wait **5 seconds**. A notification banner saying *"Welcome Back! 🔔"* will appear.
6. Tap the notification banner.
7. **Verify**: The app opens and immediately navigates to the **User Profile** screen, displaying:
   - **User Name**: `TJ`
   - **Route Source**: `Deep-Linked via Push Notification`
   - **Trigger Time**: *[Current time of trigger]*
8. Tap **← Back to Home** to return.

---

### Workflow 2: Remote Push Notifications (Direct API send)
This workflow tests real remote push notifications sent via Expo's Push servers.

1. Ensure the app has fetched and displayed the **Expo Push Token** on the home screen card.
2. Tap the **Send Push Notification** button.
3. **Verify**: The app sends a request to Expo's push service. 
4. Put the app in the background. You should receive a push notification from the remote servers.
5. Alternatively, copy the **Expo Push Token** shown on the screen.
6. Open the [Expo Push Notification Tool](https://expo.dev/notifications) in your browser.
7. Paste your token, customize the message, and add the JSON data payload:
   ```json
   {
     "screen": "Profile",
     "userName": "TJ"
   }
   ```
8. Send the notification, tap the banner, and verify that the routing works!
