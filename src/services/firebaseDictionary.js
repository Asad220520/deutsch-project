import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";

// Добавить слово
export async function addWordToUserDictionary(wordObj) {
  const user = auth.currentUser;
  if (!user) throw new Error("Пользователь не авторизован");

  const ref = collection(db, "users", user.uid, "dictionary");
  await addDoc(ref, wordObj);
}

// Получить все слова
export async function loadUserDictionary() {
  const user = auth.currentUser;
  if (!user) return [];

  const ref = collection(db, "users", user.uid, "dictionary");
  const snap = await getDocs(ref);
  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Удалить слово
export async function deleteWordFromUserDictionary(wordId) {
  const user = auth.currentUser;
  if (!user) throw new Error("Пользователь не авторизован");

  const ref = doc(db, "users", user.uid, "dictionary", wordId);
  await deleteDoc(ref);
}
