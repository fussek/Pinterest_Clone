// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD3RvSISD0ONgIlcigtVAobcGxYn35kcQQ',
  authDomain: 'check-this-out-firebase.firebaseapp.com',
  projectId: 'check-this-out-firebase',
  storageBucket: 'check-this-out-firebase.appspot.com',
  messagingSenderId: '96081109520',
  appId: '1:96081109520:web:6de8d38c0df27064a12095',
  measurementId: 'G-29PMLSQ376',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
