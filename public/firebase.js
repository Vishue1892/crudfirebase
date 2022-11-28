// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getFirestore, 
  collection, 
  addDoc, 
  getDocs,  
  deleteDoc,
  onSnapshot,
  doc,
  getDoc,
  updateDoc, 
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import {getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js"
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

const db = getFirestore()

const storage = getStorage();

export const saveTask = (title, description) => 
    addDoc(collection(db,"tasks"),{title,description});

export const getTasks = () => getDocs(collection(db,'tasks')) 

export const onGetTasks =  (callback) => onSnapshot(collection(db,'tasks'),callback)

export const deleteTask = id => deleteDoc(doc(db,'tasks',id))

export const getTask = id => getDoc(doc(db,'tasks',id)) 

export const updateTask = (id,newFields) => updateDoc(doc(db,'tasks',id),newFields) 

export const saveImage = file =>{
  const storageRef = ref(storage, `images/${file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //console.log('Upload is ' + progress + '% done');
      document.querySelector('#progress').innerText='Upload is ' + progress + '% done';
      document.querySelector('#progress').value=progress;
    }, 
    (error) => {
      // Handle unsuccessful uploads
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //document.querySelector('#progress').value='Fin!';
        document.querySelector('#image').src=downloadURL;
        console.log('File available at', downloadURL);
      });
    }
  );
}