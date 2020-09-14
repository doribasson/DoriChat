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

// const firebaseConfig = {
//   apiKey: "AIzaSyAxfqy8FkoSiM2fE1pQqtsDZqTSJV8euwg",
//   authDomain: "doribasson-chat.firebaseapp.com",
//   databaseURL: "https://doribasson-chat.firebaseio.com",
//   projectId: "doribasson-chat",
//   storageBucket: "doribasson-chat.appspot.com",
//   messagingSenderId: "299407529071",
//   appId: "1:299407529071:web:472472d3afea69ecc0a99a"
// };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
