// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCg0NAXbddSGwQSy2CqR7ZEojWIdX7RWYc",
    authDomain: "rafa-hotwheels.firebaseapp.com",
    projectId: "rafa-hotwheels",
    storageBucket: "rafa-hotwheels.firebasestorage.app",
    messagingSenderId: "33510959055",
    appId: "1:33510959055:web:124a31b0e20ab4418914ba",
    measurementId: "G-LXPZN8BK1D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics only in production
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;