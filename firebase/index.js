import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXeLNyeLygJxUWLaHDhGZgeK4qKHxU4SM",
  authDomain: "anirec-902e9.firebaseapp.com",
  projectId: "anirec-902e9",
  storageBucket: "anirec-902e9.firebasestorage.app",
  messagingSenderId: "517020752686",
  appId: "1:517020752686:web:33ee2b2de08713d888b8bf",
  measurementId: "G-W1F98SSF39",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
