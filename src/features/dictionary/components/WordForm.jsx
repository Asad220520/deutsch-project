import React, { useState } from "react";

function WordForm({ onSubmit }) {
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!word.trim() || !translation.trim()) return;

    onSubmit({ word, translation });
    setWord("");
    setTranslation("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Слово"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <input
        type="text"
        placeholder="Перевод"
        value={translation}
        onChange={(e) => setTranslation(e.target.value)}
      />
      <button type="submit">Добавить</button>
    </form>
  );
}

export default WordForm;
