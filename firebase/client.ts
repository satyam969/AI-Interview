// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsoRskoY9hyJ4l5yyuwIB3Shz4yi310-E",
  authDomain: "interview-ai-88f74.firebaseapp.com",
  projectId: "interview-ai-88f74",
  storageBucket: "interview-ai-88f74.firebasestorage.app",
  messagingSenderId: "362475217259",
  appId: "1:362475217259:web:e97a6d24062af021b7ec2e",
  measurementId: "G-9TERBX49VL"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig):getApp();
export const auth=getAuth(app);
export const db=getFirestore(app)