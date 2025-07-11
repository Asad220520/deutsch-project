// lesson/LessonRulesPage.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useLessonData } from "./useLessonData";
import { LessonWordsBlock } from "./LessonWordsBlock";
import { LessonRulesBlock } from "./LessonRulesBlock";

export function LessonRulesPage() {
  const { id } = useParams();
  const { words, rules, loading } = useLessonData(id);

  // Аккордеон - открытый индекс правила
  const [openRuleIndex, setOpenRuleIndex] = useState(null);
  // Хранение ответов пользователя (ruleIndex-questionIndex -> текст)
  const [answers, setAnswers] = useState({});

  function toggleRule(idx) {
    setOpenRuleIndex(openRuleIndex === idx ? null : idx);
  }

  function onAnswerChange(ruleIdx, questionIdx, value) {
    setAnswers((prev) => ({
      ...prev,
      [`${ruleIdx}-${questionIdx}`]: value,
    }));
  }

  if (loading) return <div className="p-4">Загрузка урока...</div>;
  if (!words.length && !rules.length)
    return <div className="p-4">Данные не найдены</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Урок</h1>

      <LessonWordsBlock words={words} />

      {rules.map((rule, idx) => (
        <LessonRulesBlock
          key={idx}
          index={idx}
          rule={rule}
          isOpen={openRuleIndex === idx}
          onToggle={() => toggleRule(idx)}
          answers={answers}
          onAnswerChange={onAnswerChange}
        />
      ))}
    </div>
  );
}
