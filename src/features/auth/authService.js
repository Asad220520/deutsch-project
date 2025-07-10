import { auth } from "../firebase/config";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

// Настройка провайдера (опционально)
provider.setCustomParameters({
  prompt: "select_account", // Всегда запрашивать выбор аккаунта
});

// Вход через redirect
export const signInWithGoogle = () => {
  return signInWithRedirect(auth, provider);
};

// Выход
export const logout = () => {
  return signOut(auth);
};

// Подписка на изменения состояния аутентификации
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Получение текущего пользователя
export const getCurrentUser = () => {
  return auth.currentUser;
};
