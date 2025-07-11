import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WordAudioQuiz from "./WordAudioQuiz";
import WordMatchingGame from "./WordMatchingGame";
import { addWordToFirebase } from "../../dictionary/store/dictionaryThunks";
import { v4 as uuidv4 } from "uuid";
import { fetchLessonById } from "../../lessons/lessonsService"; // твой сервис

export function LessonWordsPage() {
  const { id } = useParams();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  const [levelIndex, setLevelIndex] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [addedToDict, setAddedToDict] = useState(false);

  useEffect(() => {
    async function loadLesson() {
      setLoading(true);
      try {
        const data = await fetchLessonById(id);
        setLesson(data);
      } catch (err) {
        console.error("Ошибка загрузки урока", err);
        setLesson(null);
      } finally {
        setLoading(false);
      }
    }
    loadLesson();
  }, [id]);

  const { quizLevels, matchLevels } = useMemo(() => {
    if (!lesson) return { quizLevels: [], matchLevels: [] };

    const wordStrings =
      lesson.levels?.flatMap((level) =>
        level.components?.flatMap((c) =>
          c.type === "word_check_target" && Array.isArray(c.data.words)
            ? c.data.words
            : []
        )
      ) || [];

    const wordPairs = wordStrings
      .map((str) => {
        const [de, ru] = str.split("–").map((s) => s.trim());
        return de && ru ? { de, ru } : null;
      })
      .filter(Boolean);

    const chunkSize = 6;
    const matchLevels = [];
    const quizLevels = [];

    for (let i = 0; i < wordPairs.length; i += chunkSize) {
      const chunk = wordPairs.slice(i, i + chunkSize);
      const quizWords = chunk.map(({ de, ru }) => {
        const otherTranslations = chunk
          .filter((w) => w.ru !== ru)
          .map((w) => w.ru);
        const distractors = shuffle(otherTranslations).slice(0, 2);
        const options = shuffle([ru, ...distractors]);
        return {
          word: de,
          correct: ru,
          options,
        };
      });

      matchLevels.push(chunk);
      quizLevels.push(quizWords);
    }

    return { quizLevels, matchLevels };
  }, [lesson]);

  const isLastLevel = levelIndex === quizLevels.length - 1;

  const handleNextLevel = () => {
    if (levelIndex + 1 < quizLevels.length) {
      setLevelIndex((prev) => prev + 1);
      setQuizFinished(false);
      setAddedToDict(false);
    }
  };

  const handleAddToDict = () => {
    const newWords = matchLevels[levelIndex].map(({ de, ru }) => ({
      id: uuidv4(),
      word: de,
      translation: ru,
      type: "lesson",
    }));

    newWords.forEach((word) => {
      dispatch(addWordToFirebase(word));
    });

    setAddedToDict(true);
  };

  if (loading) return <div className="p-4 text-center">Загрузка урока...</div>;
  if (!lesson)
    return <div className="p-4 text-center text-red-500">Урок не найден</div>;
  if (quizLevels.length === 0)
    return (
      <div className="p-4 text-center text-gray-500">Нет слов в уроке</div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Уровень {levelIndex + 1}
      </h1>

      {!quizFinished && (
        <WordAudioQuiz
          words={quizLevels[levelIndex]}
          onFinish={() => setQuizFinished(true)}
        />
      )}

      {quizFinished && (
        <>
          <h2 className="text-xl font-semibold text-center my-6">
            🧩 Сопоставь слова
          </h2>
          <WordMatchingGame
            pairs={matchLevels[levelIndex]}
            onFinish={handleNextLevel}
          />

          {!addedToDict && (
            <div className="text-center mt-4">
              <button
                onClick={handleAddToDict}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Добавить новые слова в словарь
              </button>
            </div>
          )}

          {addedToDict && (
            <p className="text-green-700 mt-2 text-center">
              Слова добавлены в словарь!
            </p>
          )}
        </>
      )}
    </div>
  );
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}
