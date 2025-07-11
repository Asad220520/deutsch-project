// src/features/lesson-rules/useLessonRules.js
import { useEffect, useState } from "react";
import { fetchLessonById } from "../lessonsService";

export function useLessonRules(lessonId) {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lessonId) return;

    async function loadRules() {
      try {
        const lesson = await fetchLessonById(lessonId);
        const theoryComponents =
          lesson.levels?.flatMap(
            (level) =>
              level.components?.filter((c) => c.type === "theory") || []
          ) || [];
        const allRules = theoryComponents
          .map((c) => c.data.text || "")
          .filter(Boolean);
        setRules(allRules);
      } catch (err) {
        console.error("Ошибка при загрузке правил", err);
        setRules([]);
      } finally {
        setLoading(false);
      }
    }

    loadRules();
  }, [lessonId]);

  return { rules, loading };
}
