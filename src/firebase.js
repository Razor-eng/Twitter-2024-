import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDb4TV83dA20RyKELqGHOrz4sEa-FmbQgI",
    authDomain: "twitterr-2024.firebaseapp.com",
    projectId: "twitterr-2024",
    storageBucket: "twitterr-2024.appspot.com",
    messagingSenderId: "104878632982",
    appId: "1:104878632982:web:7cfb7d832ac74bf2030537"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);