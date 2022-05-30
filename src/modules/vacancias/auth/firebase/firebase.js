import { GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBofpN4T2o63On43zla7NuGtsQhfQNicAc",
    authDomain: "actualizacion-datos.firebaseapp.com",
    projectId: "actualizacion-datos",
    storageBucket: "actualizacion-datos.appspot.com",
    messagingSenderId: "485017659098",
    appId: "1:485017659098:web:c00c788ead59191391a7e3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const googleAuthProvider = new GoogleAuthProvider()

export {
    googleAuthProvider
}


