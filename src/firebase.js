

import { getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';

const firebaseConfig = {

  apiKey: "AIzaSyByGAtTu0u2eHdxPgassvZBrmRsyMX4HmI",

  authDomain: "crudjadelivery.firebaseapp.com",

  projectId: "crudjadelivery",

  storageBucket: "crudjadelivery.appspot.com",

  messagingSenderId: "307615361447",

  appId: "1:307615361447:web:34f99e2a5077b8da4aee82"

};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


