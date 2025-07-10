// src/features/lessons/components/LessonForm.jsx
import React, { useState } from "react";
import LevelEditor from "./LevelEditor";

export default function LessonForm({ onSave }) {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [levels, setLevels] = useState([]);

  const addLevel = () => {
    setLevels([...levels, { title: "", components: [] }]);
  };

  const updateLevel = (index, updated) => {
    const newLevels = [...levels];
    newLevels[index] = updated;
    setLevels(newLevels);
  };

  const handleSubmit = async () => {
    await onSave({ title, video_url: videoUrl, levels });
    setTitle("");
    setVideoUrl("");
    setLevels([]);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Создать урок</h2>

      <input
        className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название урока"
      />

      <input
        className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Ссылка на видео"
      />

      <button
        type="button"
        onClick={addLevel}
        className="mb-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
      >
        + Добавить уровень
      </button>

      <div className="space-y-4">
        {levels.map((lvl, i) => (
          <LevelEditor
            key={i}
            level={lvl}
            onChange={(val) => updateLevel(i, val)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
      >
        Сохранить
      </button>
    </div>
  );
}
