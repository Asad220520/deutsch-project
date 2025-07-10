import React, { useEffect, useState } from "react";
import { fetchLessons } from "../../lessons/lessonsService";

export default function AdminLessonList() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadLessons() {
      setLoading(true);
      try {
        const data = await fetchLessons();
        setLessons(data);
      } catch (err) {
        setError("Ошибка загрузки уроков");
      } finally {
        setLoading(false);
      }
    }
    loadLessons();
  }, []);

  if (loading) return <div>Загрузка уроков...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Уроки (админ)</h1>
      {lessons.length === 0 ? (
        <p>Уроки не найдены.</p>
      ) : (
        <ul className="space-y-2">
          {lessons.map((lesson) => (
            <li
              key={lesson.id}
              className="border p-3 rounded shadow hover:bg-gray-50 cursor-pointer"
            >
              <h2 className="font-semibold">{lesson.title}</h2>
              <p>Видео: {lesson.video_url || "Нет ссылки"}</p>
              <p>Количество уровней: {lesson.levels?.length || 0}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
