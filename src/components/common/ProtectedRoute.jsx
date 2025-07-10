// src/components/common/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    // Пока не знаем, залогинен ли — можно показать спиннер или ничего
    return <div className="text-center mt-10">Загрузка...</div>;
  }

  return user ? children : <Navigate to="/login" />;
}
