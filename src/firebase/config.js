//Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBA5G3RsLTN1yb0hLkK9TC2qA_p3pRQt8",
  authDomain: "projetointegrador-52c60.firebaseapp.com",
  projectId: "projetointegrador-52c60",
  storageBucket: "projetointegrador-52c60.appspot.com",
  messagingSenderId: "300131431999",
  appId: "1:300131431999:web:162aaf30ecec35f3ce2a8a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authd = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const auth = getAuth(app);
export const db = getFirestore(app);
/* export const auth = initializeApp(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
}); */
export const storage = getStorage();
