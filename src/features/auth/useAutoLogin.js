// src/features/auth/useAutoLogin.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";
import { setUser, setLoading } from "./authSlice";

export default function useAutoLogin() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true)); // ⬅️ Устанавливаем загрузку до начала

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const tokenResult = await user.getIdTokenResult(true); // ⬅️ true — обновляет токен (ВАЖНО)
          const token = tokenResult.token;
          const role = tokenResult.claims.role || "user";

          localStorage.setItem("token", token);

          dispatch(
            setUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              role,
            })
          );
        } catch (err) {
          console.error("Ошибка авто-логина:", err);
        }
      }

      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);
}
