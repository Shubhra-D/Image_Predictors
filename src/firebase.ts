import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeYXS4zu-ddkrNZKjgIGYyDMZ1chKgF2U",
  authDomain: "image-predictor-89b37.firebaseapp.com",
  projectId: "image-predictor-89b37",
  storageBucket: "image-predictor-89b37.firebasestorage.app",
  messagingSenderId: "1067428017539",
  appId: "1:1067428017539:web:9aa16c261e12207e67b2b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const  auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getDatabase(app)
