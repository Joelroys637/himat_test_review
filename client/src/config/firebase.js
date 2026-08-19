import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// TODO: Replace this with your actual Firebase Web Config
// You can find this in your Firebase Console -> Project Settings -> General -> Your apps -> Web app
const firebaseConfig = {
  apiKey: "AIzaSyDLg3qlonCrVmDsaToIXodpZI3JgMYGSoA",
  authDomain: "himat-review-project.firebaseapp.com",
  databaseURL: "https://himat-review-project-default-rtdb.firebaseio.com",
  projectId: "himat-review-project",
  storageBucket: "himat-review-project.firebasestorage.app",
  messagingSenderId: "1078584841257",
  appId: "1:1078584841257:web:6656a9f9b6e0f67a83b838"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
