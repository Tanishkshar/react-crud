import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyBlYbQIhm2LFYgHwb7ve-_fsejJ2xPhz-A",
  authDomain: "stud-management.firebaseapp.com",
  projectId: "stud-management",
  storageBucket: "stud-management.appspot.com",
  messagingSenderId: "129918982385",
  appId: "1:129918982385:web:3f9be1d31a289f56aff150",
};

const firebase_database = firebase.initializeApp(firebaseConfig);

export default firebase_database.database().ref();
