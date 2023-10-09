// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCIX0nifM7k4dhUGBp3M51rKKQoqCWDk_Y",
  authDomain: "hospitalapp-e68b0.firebaseapp.com",
  projectId: "hospitalapp-e68b0",
  storageBucket: "hospitalapp-e68b0.appspot.com",
  messagingSenderId: "840449240085",
  appId: "1:840449240085:web:41293e392c7bc83342321c",
  measurementId: "G-Y3W6W64SPJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



