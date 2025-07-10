import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/layout/header";
import MobileNav from "../components/layout/MobileNav";
import { useLoadDictionaryFromStorage } from "../features/dictionary/store/useLoadDictionaryFromStorage";

export default function MainLayout() {
  const location = useLocation();
  const isWelcomePage = location.pathname === "/";

  // ⬇️ Загрузка словаря из localStorage
  useLoadDictionaryFromStorage();

  return (
    <div className="min-h-screen flex flex-col">
      {!isWelcomePage && <Header />}

      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>

      {!isWelcomePage && <MobileNav />}
    </div>
  );
}
