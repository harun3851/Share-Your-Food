// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "foodshare-b6880.firebaseapp.com",
  projectId: "foodshare-b6880",
  storageBucket: "foodshare-b6880.appspot.com",
  messagingSenderId: "154899350257",
  appId: "1:154899350257:web:23fa14bc179c138fa05f50"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);