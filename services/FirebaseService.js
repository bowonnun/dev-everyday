import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
//insert config from firebase
const firebaseConfig = {
    apiKey: "AIzaSyAkz2fn3V7qgKXfQRUXehDXa1mUQ_rJzZI",
    authDomain: "karmakamet-backend.firebaseapp.com",
    databaseURL: "https://karmakamet-backend.firebaseio.com",
    projectId: "karmakamet-backend",
    storageBucket: "karmakamet-backend.appspot.com",
    messagingSenderId: "534038988789",
    appId: "1:534038988789:web:347c027ef355cd2923c2bc",
    measurementId: "G-B877MTW6V6"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;