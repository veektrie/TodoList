// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcw5saAxbSVQXisWOsOPGF5KklGRDQsDY",
  authDomain: "auth-app-e8e04.firebaseapp.com",
  projectId: "auth-app-e8e04",
  storageBucket: "auth-app-e8e04.appspot.com",
  messagingSenderId: "479674460223",
  appId: "1:479674460223:web:c60d177239693eec14708a"
};

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else{
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };