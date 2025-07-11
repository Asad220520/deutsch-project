// lesson/useLessonData.js
import { useEffect, useState } from "react";
import { fetchLessonById } from "../../lessons/lessonsService";

export function useLessonData(id) {
  const [words, setWords] = useState([]);
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const lesson = await fetchLessonById(id);

        const wordComponents =
          lesson.levels?.flatMap((level) =>
            level.components?.filter((c) => c.type === "word_check_target")
          ) || [];

        const theoryComponents =
          lesson.levels?.flatMap((level) =>
            level.components?.filter((c) => c.type === "theory")
          ) || [];

        const extractedWords = wordComponents.flatMap(
          (c) => c.data.words || []
        );

        // Предполагаем, что в c.data.rules — массив с объектами правил
        const parsedRules = theoryComponents.flatMap((c) => {
          const raw = c.data.rules;
          return Array.isArray(raw) ? raw : [];
        });

        setWords(extractedWords);
        setRules(parsedRules);
      } catch (e) {
        console.error("Ошибка загрузки", e);
        setWords([]);
        setRules([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  return { words, rules, loading };
}
