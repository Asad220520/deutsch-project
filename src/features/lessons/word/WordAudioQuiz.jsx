import React, { useEffect, useState } from "react";

export default function WordAudioQuiz({ words, onFinish }) {
  if (!Array.isArray(words) || words.length === 0) {
    return <div className="text-center text-gray-500">Нет слов для теста</div>;
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const current = words[currentIndex];

  useEffect(() => {
    if (current?.word) {
      speak(current.word);
    }
  }, [current]);

  const speak = (text) => {
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    } catch (err) {
      console.error("Ошибка озвучивания:", err);
    }
  };

  const handleSelect = (option) => {
    if (selected) return;
    setSelected(option);
    setShowResult(true);

    setTimeout(() => {
      setSelected(null);
      setShowResult(false);

      if (currentIndex + 1 < words.length) {
        setCurrentIndex((i) => i + 1);
      } else {
        onFinish?.(); // Вызов после завершения
      }
    }, 1200);
  };

  if (!current) {
    return (
      <div className="text-center text-green-600 font-semibold text-xl mt-10">
        🎉 Урок завершён!
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
      <div className="text-center">
        <button
          onClick={() => speak(current.word)}
          className="text-2xl font-bold text-blue-700 hover:underline"
        >
          🔊 {current.word}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {current.options.map((option, i) => {
          let bg = "bg-gray-100";
          if (showResult) {
            if (option === current.correct) bg = "bg-green-200";
            else if (option === selected) bg = "bg-red-200";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(option)}
              disabled={!!selected}
              className={`p-4 rounded-xl text-lg font-medium shadow transition ${bg} hover:bg-gray-200`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="text-center text-gray-500">
        {currentIndex + 1} / {words.length}
      </div>
    </div>
  );
}
