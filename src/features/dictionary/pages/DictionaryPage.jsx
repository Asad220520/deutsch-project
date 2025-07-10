import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  loadDictionaryFromFirebase,
  deleteWordFromFirebase,
  addWordToFirebase,
} from "../store/dictionaryThunks";
import {
  selectDictionaryWords,
  selectLastAddedWord,
  clearLastAdded,
} from "../store/dictionarySlice";
import WordForm from "../components/WordForm";

export default function DictionaryPage() {
  const dispatch = useDispatch();
  const words = useSelector(selectDictionaryWords);
  const lastAdded = useSelector(selectLastAddedWord);

  useEffect(() => {
    dispatch(loadDictionaryFromFirebase());
  }, [dispatch]);

  const handleAdd = (wordData) => {
    dispatch(addWordToFirebase(wordData));
  };

  const handleDelete = (id) => {
    dispatch(deleteWordFromFirebase(id));
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">📖 Мой словарь</h2>

      {lastAdded && (
        <div className="bg-green-100 text-green-800 p-3 rounded mb-4 flex justify-between">
          Добавлено слово: <strong>{lastAdded.word}</strong>
          <button onClick={() => dispatch(clearLastAdded())}>×</button>
        </div>
      )}

      <WordForm onSubmit={handleAdd} />

      {words.length === 0 ? (
        <p className="text-gray-500 mt-4">
          Словарь пуст. Добавьте новые слова!
        </p>
      ) : (
        <table className="w-full border border-gray-200 rounded overflow-hidden mt-6">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Слово</th>
              <th className="p-2 text-left">Перевод</th>
              <th className="p-2 text-left">Тип</th>
              <th className="p-2">Действия</th>
            </tr>
          </thead>
          <tbody>
            {words.map((word) => (
              <tr key={word.id} className="border-t">
                <td className="p-2">{word.word}</td>
                <td className="p-2">{word.translation}</td>
                <td className="p-2">{word.type}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleDelete(word.id)}
                    className="text-red-500 hover:underline"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
