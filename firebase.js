import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB5fwBukWKLe3PAYK0bTgcuxEnrm5N9gf4",
  authDomain: "whatsapp-sp.firebaseapp.com",
  projectId: "whatsapp-sp",
  storageBucket: "whatsapp-sp.appspot.com",
  messagingSenderId: "1067928471970",
  appId: "1:1067928471970:web:4520ce2b92f0ca3250cafb",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = firebase.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, provider };
