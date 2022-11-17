// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQWQ2rdMiDzahvQ3HawIAbZXM81O3T-RQ",
  authDomain: "fir-javascript-crud-ba5d4.firebaseapp.com",
  projectId: "fir-javascript-crud-ba5d4",
  storageBucket: "fir-javascript-crud-ba5d4.appspot.com",
  messagingSenderId: "579223751243",
  appId: "1:579223751243:web:3d2d24e195ebc10ace5bce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const db =getFirestore()

export const saveTask = (title,description) =>{
    addDoc(collection(db, 'task'),{title,   description})
}