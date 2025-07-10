import React, { useState } from "react";

export default function WordMatchingGame({ pairs, onFinish }) {
  const [started, setStarted] = useState(false);
  const [leftWords, setLeftWords] = useState([]);
  const [rightWords, setRightWords] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches, setMatches] = useState({});

  const handleStart = () => {
    const left = [...pairs.map((p) => p.de)];
    const right = shuffle([...pairs.map((p) => p.ru)]);
    setLeftWords(left);
    setRightWords(right);
    setStarted(true);
    setMatches({});
    setSelectedLeft(null);
  };

  const handleLeftClick = (word) => {
    setSelectedLeft(word === selectedLeft ? null : word);
  };

  const handleRightClick = (word) => {
    if (!selectedLeft) return;
    setMatches((prev) => ({ ...prev, [selectedLeft]: word }));
    setSelectedLeft(null);
  };

  const getColor = (left) => {
    const matched = matches[left];
    const correct = pairs.find((p) => p.de === left)?.ru;
    if (!matched) return "bg-white";
    return matched === correct ? "bg-green-200" : "bg-red-200";
  };

  const isComplete = Object.keys(matches).length === pairs.length;

  return (
    <div className="space-y-4">
      {!started && (
        <div className="text-center">
          <button
            onClick={handleStart}
            className="bg-blue-600 text-white px-6 py-2 rounded shadow"
          >
            Начать
          </button>
        </div>
      )}

      {started && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-center">
                Немецкий
              </h3>
              {leftWords.map((word, i) => (
                <div
                  key={i}
                  className={`p-2 rounded cursor-pointer shadow mb-2 border ${
                    selectedLeft === word
                      ? "border-blue-600"
                      : "border-gray-300"
                  } ${getColor(word)}`}
                  onClick={() => handleLeftClick(word)}
                >
                  {word}
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-center">
                Русский
              </h3>
              {rightWords.map((word, i) => (
                <div
                  key={i}
                  className="p-2 rounded cursor-pointer shadow mb-2 border border-gray-300 hover:bg-gray-100"
                  onClick={() => handleRightClick(word)}
                >
                  {word}
                </div>
              ))}
            </div>
          </div>

          {isComplete && (
            <div className="text-center mt-6">
              <button
                className="bg-green-600 text-white px-6 py-2 rounded shadow"
                onClick={onFinish}
              >
                Продолжить ➡️
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
