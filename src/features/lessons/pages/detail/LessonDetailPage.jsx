import { Link, Outlet, useParams } from "react-router-dom";

export default function LessonDetailPage() {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Детали урока</h1>

      <div className="flex space-x-4 mb-8">
        <Link
          to={`/lessons/${id}/words`}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Слова
        </Link>
        <Link
          to={`/lessons/${id}/rules`}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Правила
        </Link>
        <Link
          to={`/lessons/${id}/practice`}
          className="px-4 py-2 bg-purple-500 text-white rounded"
        >
          Практика
        </Link>
      </div>

      {/* Тут будет рендериться выбранная "вкладка" */}
      <Outlet />
    </div>
  );
}
