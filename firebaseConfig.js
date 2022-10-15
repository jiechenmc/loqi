// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyA2ffbETwL8hupSveo6d55YTOun0kYzCC4",
  authDomain: "loqi-loqi.firebaseapp.com",
  databaseURL: "https://loqi-loqi-default-rtdb.firebaseio.com",
  projectId: "loqi-loqi",
  storageBucket: "loqi-loqi.appspot.com",
  messagingSenderId: "622541820845",
  appId: "1:622541820845:web:e7b417188f959ea1c40724",
  measurementId: "G-HZDJC6PYH8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const auth = getAuth(app);
