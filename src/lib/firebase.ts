// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCYAt1hjmb5BThRNpRDcOyjeZGjqNeKFz4",
  authDomain: "jet-hire-bb3e1.firebaseapp.com",
  databaseURL: "https://jet-hire-bb3e1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "jet-hire-bb3e1",
  storageBucket: "jet-hire-bb3e1.firebasestorage.app",
  messagingSenderId: "644016183222",
  appId: "1:644016183222:web:f6e3e3ea7ed3e26e1e9317"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getDatabase(app);
