import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-4">404 — Страница не найдена</h1>
      <p className="mb-6">Похоже, вы перешли по неверной ссылке.</p>
      <Link to="/" className="text-blue-600 underline">
        Вернуться на главную
      </Link>
    </div>
  );
}
