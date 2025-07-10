import React from "react";

function WordList({ words, onDelete }) {
  if (!words.length) return <div>Словарь пуст.</div>;

  return (
    <ul>
      {words.map((word) => (
        <li key={word.id}>
          <strong>{word.word}</strong>: {word.translation}
          <button onClick={() => onDelete(word.id)}>Удалить</button>
        </li>
      ))}
    </ul>
  );
}

export default WordList;
