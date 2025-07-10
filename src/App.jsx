import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "./firebase/config";
import { loadDictionaryFromFirebase } from "./store/dictionary/dictionaryThunks"; // ⬅️ добавим это
import useAutoLogin from "./features/auth/useAutoLogin";
import AppRouter from "./router/AppRouter";
import addTestUser from "./services/addTestUser";

export default function App() {
  const dispatch = useDispatch();

  useAutoLogin();

  useEffect(() => {
    addTestUser();
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(loadDictionaryFromFirebase());
      }
    });

    return () => unsub();
  }, [dispatch]);

  return <AppRouter />;
}
