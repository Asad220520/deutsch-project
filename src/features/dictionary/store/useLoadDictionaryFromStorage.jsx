import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addWords } from "./dictionarySlice";

// Добавьте export перед функцией
export function useLoadDictionaryFromStorage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const saved = localStorage.getItem("dictionary");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch(addWords(parsed));
      } catch (e) {
        console.error("Ошибка при загрузке словаря из localStorage", e);
      }
    }
  }, [dispatch]);
}
