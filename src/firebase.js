import { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import "firebase/database";

const firebaseConfig = {

  apiKey: "AIzaSyALK1d-rDSih7J8QEQqlsbrL31A-mrr8co",

  authDomain: "jadelivery-f351e.firebaseapp.com",

  projectId: "jadelivery-f351e",

  storageBucket: "jadelivery-f351e.appspot.com",

  messagingSenderId: "443796003968",

  appId: "1:443796003968:web:e904e081867ca5f2ea5a65",

  measurementId: "G-1X2S3RJBCP"

};


// Initialize Firebase
const fire = initializeApp(firebaseConfig);
const auth = getAuth();

export default fire;

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  const [ currentUser, setCurrentUser ] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}

