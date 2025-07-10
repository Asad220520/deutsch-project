import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/", label: "Главная" },
  { path: "/lessons", label: "Уроки" },
  { path: "/profile", label: "Профиль" },
  { path: "/login", label: "Вход" },
  { path: "/register", label: "Регистрация" },
];

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-semibold">Deutsch Lern</h1>
        <div className="flex gap-4">
          {navItems.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `hover:underline transition ${
                  isActive ? "font-bold underline" : ""
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
