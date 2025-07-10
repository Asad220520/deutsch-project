import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchLessonById } from "../../../lessons/lessonsService";

export function LessonRulesPage() {
  const { id } = useParams();
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRules() {
      try {
        const lesson = await fetchLessonById(id);
        // Правила у тебя, скорее всего, лежат в level.components с типом "theory"
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
  }, [id]);

  if (loading) return <div>Загрузка правил...</div>;

  if (rules.length === 0) return <div>Правила не найдены</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Правила урока</h2>
      {rules.map((ruleText, i) => (
        <p
          key={i}
          className="mb-4 whitespace-pre-wrap border-b border-gray-300 pb-2"
        >
          {ruleText}
        </p>
      ))}
    </div>
  );
}
