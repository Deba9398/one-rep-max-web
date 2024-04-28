// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB5duXQ5__by8_j3beaizo8jX4A4RDPmdg',
  authDomain: 'one-rep-max---web.firebaseapp.com',
  projectId: 'one-rep-max---web',
  storageBucket: 'one-rep-max---web.appspot.com',
  messagingSenderId: '103827349034',
  appId: '1:103827349034:web:d687bf8a9f716cbe666d53',
  measurementId: 'G-P4H66SHRCG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();

export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();
setPersistence(auth, browserLocalPersistence);

export const signInWithGooglePopupInit = () =>
  signInWithPopup(auth, googleProvider);
export const signOutUser = () => signOut(auth);
