import React, { useEffect, useState } from "react";
import { fetchLessons, createLesson } from "../../lessons/lessonsService";
import { setLessons, addLesson, setLoading, setError } from "../../lessons/lessonsSlice";

import { useDispatch, useSelector } from "react-redux";
import LessonCard from "../../lessons/components/LessonCard";

export default function AdminLessonList() {
  const dispatch = useDispatch();
  const { lessons, loading, error } = useSelector((state) => state.lessons);

  useEffect(() => {
    async function loadLessons() {
      try {
        dispatch(setLoading(true));
        const data = await fetchLessons();
        dispatch(setLessons(data));
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    }
    loadLessons();
  }, [dispatch]);

  const handleSave = async (lesson) => {
    try {
      const saved = await createLesson(lesson);
      dispatch(addLesson(saved));
    } catch (err) {
      dispatch(setError(err.message));
      console.error("Ошибка при сохранении урока:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Уроки</h1>

      {/* <LessonForm onSave={handleSave} /> */}

      <hr className="my-8 border-gray-300" />

      {loading && (
        <div className="text-center text-blue-500 font-medium">Загрузка...</div>
      )}

      {error && (
        <div className="text-center text-red-500 font-medium">
          Ошибка: {error}
        </div>
      )}

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}

