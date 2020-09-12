import Firebase from "firebase/firebase";

var firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_KEY,
  authDomain: "movies-28230.firebaseapp.com",
  databaseURL: "https://movies-28230.firebaseio.com",
  projectId: "movies-28230",
  storageBucket: "movies-28230.appspot.com",
  messagingSenderId: process.env.VUE_APP_SENDER_ID,
  appId: process.env.VUE_APP_ID,
  measurementId: "G-DYF7H87LM2",
};
// Initialize Firebase
const app = Firebase.initializeApp(firebaseConfig);

export const db = app.firestore();
export const auth = app.auth();
