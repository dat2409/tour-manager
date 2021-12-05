// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKXYU3zKofIT-7f7JgumWYbPfzNkuYxc8",
  authDomain: "todo-ninja-ba91d.firebaseapp.com",
  projectId: "todo-ninja-ba91d",
  storageBucket: "todo-ninja-ba91d.appspot.com",
  messagingSenderId: "182946173123",
  appId: "1:182946173123:web:457f9559f6dc81af935276",
  measurementId: "G-MSL465V6NV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export default db;
