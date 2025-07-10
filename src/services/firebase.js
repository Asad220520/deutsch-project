// src/firebase/config.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
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

// Инициализация приложения
const app = initializeApp(firebaseConfig);

// Инициализация сервисов
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Настройка persistence для аутентификации
const initAuthPersistence = async () => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    // Альтернативно можно использовать browserSessionPersistence
    // await setPersistence(auth, browserSessionPersistence);
  } catch (error) {
    console.error("Ошибка настройки persistence:", error);
  }
};

// Инициализация persistence
initAuthPersistence();

// Настройки для Firestore (опционально)
const firestoreSettings = {
  experimentalForceLongPolling: true, // Для некоторых сред выполнения
  merge: true, // Для безопасного обновления документов
};

// Экспорт сервисов
export {
  app,
  auth,
  db,
  storage,
  firebaseConfig, // Экспорт конфига может пригодиться
};

// Экспорт функций для ручной инициализации (если нужно)
export const initializeFirebase = () => {
  return { app, auth, db, storage };
};
