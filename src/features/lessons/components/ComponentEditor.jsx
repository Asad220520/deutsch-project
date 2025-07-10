// src/features/lessons/components/ComponentEditor.jsx
import React from "react";

export default function ComponentEditor({ component, onChange }) {
  const { type, data } = component;

  const update = (field) => (e) => {
    onChange({ type, data: { ...data, [field]: e.target.value } });
  };

  const baseInputClasses =
    "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 mb-2";

  switch (type) {
    case "video":
      return (
        <input
          className={baseInputClasses}
          value={data.url || ""}
          onChange={update("url")}
          placeholder="URL видео"
        />
      );

    case "word_check_target":
      return (
        <input
          className={baseInputClasses}
          value={data.words?.join(", ") || ""}
          onChange={(e) =>
            onChange({
              type,
              data: { words: e.target.value.split(",").map((w) => w.trim()) },
            })
          }
          placeholder="Слова через запятую"
        />
      );

    case "theory":
      return (
        <textarea
          className={baseInputClasses + " resize-y min-h-[100px]"}
          value={data.text || ""}
          onChange={update("text")}
          placeholder="Текст теории"
        />
      );

    default:
      return (
        <div className="text-red-500 font-semibold mt-2">
          Компонент "{type}" не реализован
        </div>
      );
  }
}
