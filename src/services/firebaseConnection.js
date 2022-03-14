import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCf_e3H7WR4k_XY5p6d1ifHWyhR-L-z0SE",
  authDomain: "sistema-chamados-79184.firebaseapp.com",
  projectId: "sistema-chamados-79184",
  storageBucket: "sistema-chamados-79184.appspot.com",
  messagingSenderId: "130844607175",
  appId: "1:130844607175:web:caa8d61e6ea2290bc434e2",
  measurementId: "G-6Q7LTL4S2Y",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
