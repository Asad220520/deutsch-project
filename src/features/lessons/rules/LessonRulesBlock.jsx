// lesson/LessonRulesBlock.jsx
import React from "react";

export function LessonRulesBlock({
  index,
  rule,
  isOpen,
  onToggle,
  answers,
  onAnswerChange,
}) {
  return (
    <div className="border rounded shadow-sm overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left px-4 py-3 bg-blue-100 hover:bg-blue-200 flex justify-between items-center"
      >
        <span className="font-semibold">{rule.title}</span>
        <span>{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="p-4 bg-white space-y-4">
          {rule.description && (
            <p className="whitespace-pre-wrap text-gray-800">
              {rule.description}
            </p>
          )}

          {rule.questions?.map((q, qIdx) => (
            <div key={qIdx}>
              <label className="block mb-1 font-medium">{q}</label>
              <textarea
                rows={2}
                className="w-full border rounded p-2"
                value={answers[`${index}-${qIdx}`] || ""}
                onChange={(e) => onAnswerChange(index, qIdx, e.target.value)}
                placeholder="Напишите ваш ответ здесь..."
              />
            </div>
          ))}

          {rule.examples?.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Примеры:</h4>
              <ul className="list-disc list-inside grid grid-cols-2 gap-2">
                {rule.examples.map((ex, i) => (
                  <li
                    key={i}
                    className="bg-gray-100 p-2 rounded cursor-pointer hover:bg-gray-200"
                    title="Кликните для взаимодействия"
                  >
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {rule.subblocks?.map((block, i) => (
            <div key={i} className="mt-4">
              {block.questions.map((q, i) => (
                <p key={i} className="whitespace-pre-wrap mb-1">
                  {q}
                </p>
              ))}
            </div>
          ))}

          {rule.links?.length > 0 && (
            <div className="mt-4 space-y-1">
              <h4 className="font-semibold">Полезные ссылки:</h4>
              {rule.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline block"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
