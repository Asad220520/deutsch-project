import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";
import { setUser, setLoading } from "./authSlice";

export default function useAutoLogin() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const tokenResult = await user.getIdTokenResult(true); // ⬅️ true — обновляет токен
          const token = tokenResult.token;
          const role = tokenResult.claims.role || "user";

          // ✅ Вставляем лог здесь
          console.log(
            role === "admin"
              ? `🔥 Пользователь — АДМИН (${user.email})`
              : `👤 Пользователь обычный (${user.email})`
          );

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
