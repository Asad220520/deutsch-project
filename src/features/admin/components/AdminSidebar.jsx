import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  const baseClass =
    "block px-4 py-2 rounded hover:bg-gray-200 transition-colors";
  const activeClass = "bg-gray-300 font-semibold";

  return (
    <nav className="w-48 bg-gray-100 min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Меню админа</h2>
      <NavLink
        to="/admin"
        end
        className={({ isActive }) =>
          isActive ? `${baseClass} ${activeClass}` : baseClass
        }
      >
        Панель администратора
      </NavLink>
      <NavLink
        to="/admin/lessons"
        className={({ isActive }) =>
          isActive ? `${baseClass} ${activeClass}` : baseClass
        }
      >
        Уроки
      </NavLink>
      <NavLink
        to="/admin/users"
        className={({ isActive }) =>
          isActive ? `${baseClass} ${activeClass}` : baseClass
        }
      >
        Пользователи
      </NavLink>

      {/* Добавляй новые пункты меню по мере необходимости */}
    </nav>
  );
}
