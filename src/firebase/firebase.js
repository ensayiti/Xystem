
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAGSlgK6HeziAZhYGMhKCwNapJdsX7vleA",
    authDomain: "react-firebase-xem.firebaseapp.com",
    projectId: "react-firebase-xem",
    storageBucket: "react-firebase-xem.appspot.com",
    messagingSenderId: "387993089861",
    appId: "1:387993089861:web:9ce14e3f9291f3ac20b02c",
    measurementId: "G-01ML5NFPEG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {auth}