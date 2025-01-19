// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDUG82GkhMQW9JHhz__H1RhldTholC1460",
    authDomain: "cropwise1-43ac3.firebaseapp.com",
    projectId: "cropwise1-43ac3",
    storageBucket: "cropwise1-43ac3.firebasestorage.app",
    messagingSenderId: "238646979262",
    appId: "1:238646979262:web:6e235aea9bd42205b30cef"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 