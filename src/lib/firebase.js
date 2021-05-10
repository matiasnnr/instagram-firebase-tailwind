import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// importamos el seed para ejecutarlo UNA SOLA VEZ y llenar firebase
// import seedDatabase from '../seed.js';

const config = {
  apiKey: "AIzaSyDH-8d82UNPHCgOTl1bxVykIJxI3V66GL4",
  authDomain: "instagram-clon-10.firebaseapp.com",
  projectId: "instagram-clon-10",
  storageBucket: "instagram-clon-10.appspot.com",
  messagingSenderId: "365952997390",
  appId: "1:365952997390:web:f5e2bd7cb9d824b551845f",
  measurementId: "G-YNPVJYQ2PS"
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// ejecutamos el seedDatabase para llenar la base de datos
// seedDatabase(firebase);

export { firebase, FieldValue };
