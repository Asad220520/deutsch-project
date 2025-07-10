import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchLessonById } from "../lessonsService";

export default function LessonDetailPage() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchLessonById(id);
        if (!data) {
          setError("Урок не найден");
          setLesson(null);
        } else {
          setLesson(data);
          setError(null);
        }
      } catch (err) {
        setError("Ошибка при загрузке урока");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500 text-lg">
        Загрузка урока...
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-center text-red-600 font-semibold">{error}</div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
      <p className="mb-6 text-gray-700">
        Видео:{" "}
        {lesson.video_url.startsWith("http") ? (
          <a
            href={lesson.video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Ссылка на видео
          </a>
        ) : (
          lesson.video_url
        )}
      </p>

      <div className="space-y-8">
        {lesson.levels?.map((level, i) => (
          <div
            key={i}
            className="border border-gray-300 rounded p-4 bg-gray-50 shadow-sm"
          >
            <h2 className="text-2xl font-semibold mb-3">{level.title}</h2>
            <div className="space-y-4">
              {level.components?.map((comp, j) => (
                <div
                  key={j}
                  className="p-3 bg-white rounded shadow-sm border border-gray-200"
                >
                  {comp.type === "video" && comp.data.url && (
                    <video
                      controls
                      src={comp.data.url}
                      className="w-full rounded"
                    />
                  )}
                  {comp.type === "word_check_target" && comp.data.words && (
                    <p>
                      <span className="font-semibold">Слова:</span>{" "}
                      {comp.data.words.join(", ")}
                    </p>
                  )}
                  {comp.type === "theory" && comp.data.text && (
                    <p className="whitespace-pre-wrap">{comp.data.text}</p>
                  )}
                  {!["video", "word_check_target", "theory"].includes(
                    comp.type
                  ) && <p>Компонент "{comp.type}" не реализован</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
