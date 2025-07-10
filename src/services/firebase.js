// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBcLcLbHf2FvpRjKUS_PyqGZK3aiDUZOrc",
  authDomain: "duethsch-leng.firebaseapp.com",
  projectId: "duethsch-leng",
  storageBucket: "duethsch-leng.appspot.com",
  messagingSenderId: "1070504534885",
  appId: "1:1070504534885:web:8c8852f8c9f613f36c378c",
  measurementId: "G-LPYDDMLPMS",
};

// Инициализация
const app = initializeApp(firebaseConfig);

// Используемые сервисы
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
