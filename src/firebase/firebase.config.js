// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyCKzFinrBoKzCpHBNn0iMCZLr5RCqdR4CM',
//   authDomain: 'thread-hive.firebaseapp.com',
//   projectId: 'thread-hive',
//   storageBucket: 'thread-hive.firebasestorage.app',
//   messagingSenderId: '198704322947',
//   appId: '1:198704322947:web:ae6f8cb0673c0bb8863eb6',
//   measurementId: 'G-PZN70X3EWY',
// };
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
