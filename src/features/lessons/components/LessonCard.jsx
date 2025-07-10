import React from "react";
import { Link } from "react-router-dom";

export default function LessonCard({ lesson }) {
  return (
    <Link
      to={`/lessons/${lesson.id}`}
      className="block border border-gray-300 rounded-lg p-4 bg-white shadow-sm mb-4 hover:shadow-md transition"
    >
      <h3 className="text-lg font-semibold mb-2">{lesson.title}</h3>
      <p className="text-sm text-gray-700">
        <span className="font-medium">Видео:</span> {lesson.video_url}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-medium">Уровней:</span>{" "}
        {lesson.levels?.length || 0}
      </p>
    </Link>
  );
}
