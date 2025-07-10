import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchLessonById } from "../../../lessons/lessonsService";

export function LessonPracticePage() {
  const { id } = useParams();
  const [practiceComponents, setPracticeComponents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPractice() {
      try {
        const lesson = await fetchLessonById(id);
        // Практические компоненты — это те, что не video, word_check_target и theory
        // Например, если есть другие типы для практики, фильтруем их здесь.
        const practice =
          lesson.levels?.flatMap(
            (level) =>
              level.components?.filter(
                (c) =>
                  !["video", "word_check_target", "theory"].includes(c.type)
              ) || []
          ) || [];
        setPracticeComponents(practice);
      } catch (err) {
        console.error("Ошибка при загрузке практики", err);
        setPracticeComponents([]);
      } finally {
        setLoading(false);
      }
    }
    loadPractice();
  }, [id]);

  if (loading) return <div>Загрузка практики...</div>;

  if (practiceComponents.length === 0) return <div>Практика не найдена</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Практические задания</h2>
      {practiceComponents.map((comp, i) => (
        <div key={i} className="mb-6 p-4 border rounded bg-gray-50">
          <p>
            <span className="font-semibold">Тип компонента:</span> {comp.type}
          </p>
          {/* Можно тут вывести содержимое компонента, если оно есть */}
          {comp.data && (
            <pre className="whitespace-pre-wrap mt-2 text-sm bg-white p-2 rounded border">
              {JSON.stringify(comp.data, null, 2)}
            </pre>
          )}
        </div>
      ))}
    </div>
  );
}
