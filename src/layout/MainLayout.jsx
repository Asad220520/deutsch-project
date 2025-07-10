import { Outlet, NavLink } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Навигация */}
      <header className="bg-blue-600 text-white p-4 flex gap-4">
        <NavLink to="/" className="hover:underline">
          Главная
        </NavLink>
        <NavLink to="/lessons" className="hover:underline">
          Уроки
        </NavLink>
        <NavLink to="/profile" className="hover:underline">
          Профиль
        </NavLink>
      </header>

      {/* Основной контент */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
