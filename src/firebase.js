import firebase from 'firebase';

const firebaseApp = firebase.initializeApp( {
  apiKey: "AIzaSyBWaaLkIYlpEjhpt5F6J9noNEYLo8AQkeU",
  authDomain: "instagram-clone-c2c05.firebaseapp.com",
  databaseURL: "https://instagram-clone-c2c05-default-rtdb.firebaseio.com",
  projectId: "instagram-clone-c2c05",
  storageBucket: "instagram-clone-c2c05.appspot.com",
  messagingSenderId: "359383366398",
  appId: "1:359383366398:web:53b96acd3e5992e6ef83af"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};