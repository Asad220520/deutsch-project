import { useSelector } from "react-redux";

export default function DictionaryPage() {
  const words = useSelector((state) => state.dictionary.words); // подключи redux slice позже

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">📖 Мой словарь</h2>
      {words.length === 0 ? (
        <p className="text-gray-500">Словарь пуст. Добавьте новые слова!</p>
      ) : (
        <table className="w-full border border-gray-200 rounded overflow-hidden">
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
                  <button className="text-red-500 hover:underline">
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
