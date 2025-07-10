// src/firebase/addTestUser.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase"; // Проверь, что путь совпадает с твоим файлом firebase/config.js

const addTestUser = async () => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: "Test User",
      email: "test@example.com",
      createdAt: new Date(),
    });
    console.log("Документ успешно добавлен с ID:", docRef.id);
  } catch (e) {
    console.error("Ошибка при добавлении документа:", e);
  }
};

export default addTestUser;

// Запускаем сразу (если хочешь сразу добавить)
addTestUser();
