import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMFb5QD3SAeREvnntTcQ6S31mU3PvRrO8",
  authDomain: "twitter-clone-38c67.firebaseapp.com",
  projectId: "twitter-clone-38c67",
  storageBucket: "twitter-clone-38c67.appspot.com",
  messagingSenderId: "319399374764",
  appId: "1:319399374764:web:ad8465f370219708141409",
};

// initializing firebase
/* Checks app length, so if we are not using any app ; intialize the app with the firebase
 * config details, but if there is already an app present ; use the current app */
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { storage, db };
export default app;
