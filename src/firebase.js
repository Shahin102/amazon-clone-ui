import firebase from "firebase/compat/app";
import "firebase/compat/auth"
// import "firebase/compat/firestore"

import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyADbM3FLqx19lq0oBvmG1A6239_9RJni-I",
    authDomain: "clone-ui.firebaseapp.com",
    projectId: "clone-ui",
    storageBucket: "clone-ui.appspot.com",
    messagingSenderId: "46856827433",
    appId: "1:46856827433:web:484b29b36d6b12f53a2238"
};

// const app = initializeApp(firebaseConfig);
// const db = app.firestore();
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// export { db, auth };
export { auth };