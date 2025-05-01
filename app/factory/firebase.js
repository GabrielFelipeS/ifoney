import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmHwoMypNCp9d2dlip3_K1gcL_rvuxJXA",
  authDomain: "ifoney-28fc9.firebaseapp.com",
  projectId: "ifoney-28fc9",
  storageBucket: "ifoney-28fc9.firebasestorage.app",
  messagingSenderId: "554974885979",
  appId: "1:554974885979:web:78b177f556aed54eca277e",
  measurementId: "G-J8LW6H7MSP",
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export { firestore };
