import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase"; // убедись в правильности пути

const addTestUser = async () => {
  console.log("Trying to add test user...");

  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: "Test User",
      email: "test@example.com",
      createdAt: new Date(),
    });
    console.log("Документ успешно добавлен с ID:", docRef.id);
  } catch (e) {
    console.error("Ошибка при добавлении документа:", e.message, e);
  }
};

export default addTestUser;

addTestUser();
