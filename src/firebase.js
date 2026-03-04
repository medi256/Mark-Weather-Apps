import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBVX93gULe-SqTISGQNlhrz8TX2HYFu4Tk",
    authDomain: "weatherplus-51c48.firebaseapp.com",
    projectId: "weatherplus-51c48",
    storageBucket: "weatherplus-51c48.appspot.com",
    messagingSenderId: "962047294014",
    appId: "1:962047294014:web:e3d070ccf0fa12a2916f6f",
    measurementId: "G-DQ1HZNGJS4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };