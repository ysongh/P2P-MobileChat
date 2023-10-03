// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { FIREBASE_APIKEY, FIREBASE_MESSAGINGSENDERID, FIREBASE_APPID } from "./keys";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: "p2p-mobilechat.firebaseapp.com",
  projectId: "p2p-mobilechat",
  storageBucket: "p2p-mobilechat.appspot.com",
  messagingSenderId: FIREBASE_MESSAGINGSENDERID,
  appId: FIREBASE_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);