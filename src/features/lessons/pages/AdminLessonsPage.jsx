import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addLesson, setError } from "../lessonsSlice";
import { createLesson } from "../lessonsService";

export default function AdminLessonsPage() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [levels, setLevels] = useState([]);

  const handleAddLevel = () => {
    setLevels([...levels, { title: "", components: [] }]);
  };

  const handleLevelTitleChange = (index, value) => {
    const newLevels = [...levels];
    newLevels[index].title = value;
    setLevels(newLevels);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Введите название урока");
      return;
    }
    const lesson = {
      title,
      video_url: videoUrl,
      levels,
    };

    try {
      const saved = await createLesson(lesson);
      dispatch(addLesson(saved));
      alert("Урок добавлен!");
      setTitle("");
      setVideoUrl("");
      setLevels([]);
    } catch (err) {
      dispatch(setError(err.message));
      alert("Ошибка при добавлении урока: " + err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Админ: Добавить урок</h1>

      <label className="block mb-2 font-medium">Название урока</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-300 rounded p-2 mb-4"
        placeholder="Введите название урока"
      />

      <label className="block mb-2 font-medium">URL видео</label>
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="w-full border border-gray-300 rounded p-2 mb-4"
        placeholder="Введите URL видео"
      />

      <div className="mb-4">
        <h2 className="font-semibold mb-2">Уровни</h2>
        {levels.map((level, i) => (
          <div key={i} className="mb-3 border p-3 rounded bg-gray-50">
            <input
              type="text"
              value={level.title}
              onChange={(e) => handleLevelTitleChange(i, e.target.value)}
              placeholder={`Название уровня #${i + 1}`}
              className="w-full border border-gray-300 rounded p-2"
            />
            {/* Здесь можно расширить: добавить редактор компонентов уровня */}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddLevel}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Добавить уровень
        </button>
      </div>

      <button
        type="button"
        onClick={handleSave}
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
      >
        Сохранить урок
      </button>
    </div>
  );
}
