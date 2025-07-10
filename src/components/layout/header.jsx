import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/lessons", label: "Уроки" },
  { path: "/dictionary", label: "Словарь" },
  { path: "/settings", label: "Настройки" },
  { path: "/profile", label: "Профиль" },
];

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow hidden md:block">
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
