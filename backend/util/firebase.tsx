import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, get, update, remove, runTransaction } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const writeData = async (path: string, data: any): Promise<void> => {
  const dbRef = ref(database, path);
  
  try {
    // Check if data already exists
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      console.log(`Data already exists at ${path}`);
      throw new Error(`Data already exists`);
    }
    await set(dbRef, data);
    console.log(`Data written to ${path}`);
  } catch (error) {
    console.error(`Error writing data to ${path}: `, error);
    throw new Error(`Error writing data to ${path}`);
  }
};

// Function to read data
const readData = async (path: string): Promise<any> => {
  const dbRef = ref(database, path);
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log(`No data available at ${path}`);
      return null;
    }
  } catch (error) {
    console.error(`Error reading data from ${path}: `, error);
    throw new Error(`Error reading data from ${path}`);
  }
};

// Function to update data
const updateData = async (path: string, data: any): Promise<void> => {
  const dbRef = ref(database, path);
  try {
    const result = await update(dbRef, data);
    return result
  } catch (error) {
    console.error(`Error updating data at ${path}: `, error);
    throw new Error(`Error updating data at ${path}`);
  }
};

const registerSeat = async (path: string, data: any): Promise<void> => {
  const dbRef = ref(database, path);

  try {
    const result = await runTransaction(dbRef, (currentData) => {
      if (currentData && currentData.status !== 'free') {
        return; 
      }
      return {
        ...currentData,
        ...data,
      };
    });

    if (result.committed) {
    } else {
      throw new Error(`Transaction aborted, seat is not free`);
    }
  } catch (error) {
    throw new Error(`Transaction aborted, seat is not free`);
  }
};



// Function to delete data
const deleteData = async (path: string): Promise<void> => {
  const dbRef = ref(database, path);
  try {
    const result = await remove(dbRef);
    return result
  } catch (error) {
    console.error(`Error deleting data at ${path}: `, error);
    throw new Error(`Error deleting data at ${path}`);
  }
};


export { app, auth, database, writeData, deleteData, updateData, readData, registerSeat };