
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmmGa_df0eZ87RS-IFUfinLDqm9ngxzMQ",
  authDomain: "game-review-app-89546.firebaseapp.com",
  projectId: "game-review-app-89546",
  storageBucket: "game-review-app-89546.firebasestorage.app",
  messagingSenderId: "521028168667",
  appId: "1:521028168667:web:b41405812c03e98d9215fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);