import { NavLink } from "react-router-dom";
import {
  BookOpenIcon,
  UserIcon,
  // BookIcon, // убираем, так как нет такой иконки
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { path: "/lessons", label: "Уроки", icon: BookOpenIcon },
  { path: "/dictionary", label: "Словарь", icon: BookOpenIcon },
  { path: "/settings", label: "Настройки", icon: Cog6ToothIcon },
  { path: "/profile", label: "Профиль", icon: UserIcon },
];

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around items-center h-16 md:hidden z-50">
      {navItems.map(({ path, label, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? "text-blue-600 font-semibold" : "text-gray-500"
            }`
          }
        >
          <Icon className="w-6 h-6" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
