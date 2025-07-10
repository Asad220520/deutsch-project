import Home from "../../../pages/Home";

export default function SettingsPage() {
  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <h2 className="text-2xl font-bold mb-4">⚙️ Настройки</h2>

      <div>
        <label className="block font-medium mb-1">Язык интерфейса</label>
        <select className="border p-2 rounded w-full">
          <option value="ru">Русский</option>
          <option value="de">Немецкий</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Имя пользователя</label>
        <input
          type="text"
          placeholder="Введите имя"
          className="border p-2 rounded w-full"
        />
      </div>

      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        Удалить аккаунт
      </button>
      <Home />
    </div>
  );
}
