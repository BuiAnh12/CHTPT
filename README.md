# Project Setup Guide

This guide will help you set up the project, configure Firebase, and run the Next.js application.

## Prerequisites

- Node.js installed on your machine.
- A code editor (e.g., Visual Studio Code).
- Basic knowledge of using the terminal.

## Step 1: Create a Firebase Account

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click on **Get Started** and sign in with your Google account.
3. Follow the prompts to create your Firebase account.

## Step 2: Create an Application

1. In the Firebase Console, click on **Add project**.
2. Enter a name for your project and click **Continue**.
3. (Optional) Enable Google Analytics if needed.
4. Click **Create project** and wait for it to be set up.

## Step 3: Create a Firebase Database

1. In your Firebase project dashboard, navigate to **Build** > **Realtime Database**.
2. Click on **Create Database**.
3. Choose **Start in Test Mode** for development purposes (this allows read/write access). You can adjust security rules later.
4. Click **Next**, select a location for your database, and click **Done**.

## Step 4: Create Firebase Authentication User

1. Navigate to **Build** > **Authentication** in the Firebase Console.
2. Click on the **Get Started** button.
3. In the **Sign-in Method** tab, enable the authentication method you want to use (e.g., Email/Password).
4. Click **Save**.
5. Go to the **Users** tab and click **Add user**.
6. Enter an email and password for the user who will log in to the server.
7. Click **Add User**.

## Step 5: Import Data to Firebase Database

1. Find the `sample_data.json` file with the necessary data format.
2. In the Firebase Console, go to **Realtime Database**.
3. Click on the **three dots** (⋮) next to your database name and select **Import JSON**.
4. Choose your `sample_data.json` file and click **Import**.

## Step 6: Create `.env.local` File

Create a `.env.local` file in the root of your project and add the following environment variables:

```plaintext
NEXT_PUBLIC_FIREBASE_API_KEY=<your_firebase_api_key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your_firebase_auth_domain>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your_firebase_project_id>
NEXT_PUBLIC_FIREBASE_DATABASE_URL=<your_firebase_database_url>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your_firebase_storage_bucket>
NEXT_PUBLIC_FIREBASE_APP_ID=<your_firebase_app_id>
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=<your_firebase_measurement_id>
NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID=<your_firebase_message_sender_id>
```

Replace the placeholders with the values from your Firebase project settings. You can find these values in **Project settings** > **General** in the Firebase Console.

## Step 7: Install Node Modules

1. Open your terminal.
2. Navigate to the backend folder:
   ```bash
   cd src/backend
   ```
3. Install the required Node.js packages:
   ```bash
   npm install
   ```

## Step 8: Run the Next.js Project

1. From the terminal, navigate backend folder (if not already there):
   ```bash
   cd src/backend
   ```
2. Start the Next.js development server:
   ```bash
   npm run dev
   ```
3. Open your web browser and go to `http://localhost:3000` to view your application.

## Note: 
All APIs will be listed in the `backend/README.md`