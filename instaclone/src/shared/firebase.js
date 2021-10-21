import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {

  apiKey: "AIzaSyDDi1IMXTgXc0vWTECDaKaGAZW01NFq7nc",
  authDomain: "image-community-f8671.firebaseapp.com",
  projectId: "image-community-f8671",
  storageBucket: "image-community-f8671.appspot.com",
  messagingSenderId: "672050107835",
  appId: "1:672050107835:web:dbd664dca821186c94e09e",
  measurementId: "G-1F044QDEMY"


};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const storage = firebase.storage();
const firestore = firebase.firestore();

export{auth, apiKey, storage, firestore};