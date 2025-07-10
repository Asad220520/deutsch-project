import React, { useEffect, useState } from "react";

export default function WordMatchPuzzle({ words }) {
  const [leftItems, setLeftItems] = useState(
    words.map((w) => ({ ...w, matched: false }))
  );
  const [rightItems, setRightItems] = useState(
    shuffleArray(words.map((w) => w.translation)).map((t) => ({
      text: t,
      matched: false,
    }))
  );
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);

  function shuffleArray(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  function onLeftClick(index) {
    if (leftItems[index].matched) return;
    setSelectedLeft(index);
  }

  function onRightClick(index) {
    if (rightItems[index].matched) return;
    setSelectedRight(index);
  }

  useEffect(() => {
    if (selectedLeft !== null && selectedRight !== null) {
      const leftWord = leftItems[selectedLeft];
      const rightWord = rightItems[selectedRight];

      if (leftWord.translation === rightWord.text) {
        const newLeft = [...leftItems];
        const newRight = [...rightItems];
        newLeft[selectedLeft].matched = true;
        newRight[selectedRight].matched = true;
        setLeftItems(newLeft);
        setRightItems(newRight);
      }

      setSelectedLeft(null);
      setSelectedRight(null);
    }
  }, [selectedLeft, selectedRight]);

  return (
    <div className="flex space-x-12 max-w-xl mx-auto p-4">
      <div>
        <h3 className="mb-2 font-semibold">Слова</h3>
        <ul>
          {leftItems.map((item, i) => (
            <li
              key={i}
              className={`cursor-pointer p-2 border rounded mb-1 ${
                item.matched ? "bg-green-300 text-green-800" : ""
              } ${selectedLeft === i ? "bg-blue-200" : ""}`}
              onClick={() => onLeftClick(i)}
            >
              {item.word}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-2 font-semibold">Переводы</h3>
        <ul>
          {rightItems.map((item, i) => (
            <li
              key={i}
              className={`cursor-pointer p-2 border rounded mb-1 ${
                item.matched ? "bg-green-300 text-green-800" : ""
              } ${selectedRight === i ? "bg-blue-200" : ""}`}
              onClick={() => onRightClick(i)}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
