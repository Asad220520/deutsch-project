// lesson/LessonWordsBlock.jsx
import React from "react";

export function LessonWordsBlock({ words }) {
  if (!words.length) return null;

  return (
    <section className="bg-green-50 border border-green-300 rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-4">🧠 Новые слова</h2>
      <ul className="flex flex-wrap gap-3">
        {words.map((entry, i) => {
          const [de, ru] = entry.split("–").map((str) => str.trim());
          return (
            <li
              key={i}
              className="cursor-pointer rounded bg-green-100 px-3 py-1 select-none hover:bg-green-200"
              title="Кликните для озвучки (в будущем)"
              // onClick={() => playAudio(de)}
            >
              <span className="font-semibold text-gray-800">{de}</span> —{" "}
              <span className="text-gray-700">{ru}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
