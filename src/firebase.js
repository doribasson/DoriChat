import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCdTEx6HBKJ6ApQ_4iSL1IkZtntUlxsSDE",
  authDomain: "dori-chat.firebaseapp.com",
  databaseURL: "https://dori-chat.firebaseio.com",
  projectId: "dori-chat",
  storageBucket: "dori-chat.appspot.com",
  messagingSenderId: "344305317176",
  appId: "1:344305317176:web:9e201ec8392ec0bbc67dcd",
  measurementId: "G-B5N494MJXH"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
