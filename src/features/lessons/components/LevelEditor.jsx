// src/features/lessons/components/LevelEditor.jsx
import React from "react";
import ComponentEditor from "./ComponentEditor";

export default function LevelEditor({ level, onChange }) {
  const updateTitle = (e) => onChange({ ...level, title: e.target.value });

  const addComponent = (type) => {
    const updated = {
      ...level,
      components: [...level.components, { type, data: {} }],
    };
    onChange(updated);
  };

  const updateComponent = (idx, data) => {
    const components = [...level.components];
    components[idx] = data;
    onChange({ ...level, components });
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 mb-4">
      <input
        className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        value={level.title}
        onChange={updateTitle}
        placeholder="Название уровня"
      />

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          type="button"
          onClick={() => addComponent("video")}
          className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded-md"
        >
          + Видео
        </button>
        <button
          type="button"
          onClick={() => addComponent("word_check_target")}
          className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md"
        >
          + Слова (target)
        </button>
        <button
          type="button"
          onClick={() => addComponent("theory")}
          className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
        >
          + Теория
        </button>
      </div>

      <div className="space-y-3">
        {level.components.map((comp, i) => (
          <ComponentEditor
            key={i}
            component={comp}
            onChange={(data) => updateComponent(i, data)}
          />
        ))}
      </div>
    </div>
  );
}
