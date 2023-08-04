import {getApp, getApps, initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzGVxerZhbF0ZYKtvcrptFUaLO005w4WY",
  authDomain: "lolchat-7570e.firebaseapp.com",
  projectId: "lolchat-7570e",
  storageBucket: "lolchat-7570e.appspot.com",
  messagingSenderId: "162983276580",
  appId: "1:162983276580:web:01676877a05187d75ba8b1",
  measurementId: "G-B90K5VWLME"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
// const app = initializeApp(firebaseConfig);
if (typeof window !== 'undefined') {
    getAnalytics(app);
  }
const db = getFirestore(app)
console.log('dddddd', db)

export {db}