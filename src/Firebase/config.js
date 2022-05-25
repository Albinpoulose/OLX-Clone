import { initializeApp } from 'firebase/app';

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBioq0V07moXy4m_AYAQVTj19OrkI8q-p4",
  authDomain: "olx-clone-497f0.firebaseapp.com",
  projectId: "olx-clone-497f0",
  storageBucket: "olx-clone-497f0.appspot.com",
  messagingSenderId: "519359698498",
  appId: "1:519359698498:web:369c75b6848b3b8da2bfdb",
  measurementId: "G-RPM2LESTM0"
};

const firebaseAuth = initializeApp(firebaseConfig);

export const app = getFirestore(firebaseAuth);

export const Storage = getStorage(firebaseAuth);
