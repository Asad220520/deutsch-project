import { Routes, Route } from "react-router-dom";
import useAutoLogin from "../features/auth/useAutoLogin";

import Login from "../features/auth/LoginForm";
import Register from "../features/auth/Register";
import Profile from "../features/profile/pages/Profile";
import LessonsPage from "../features/lessons/pages/LessonsPage";
import LessonDetailPage from "../features/lessons/pages/LessonDetailPage";
import NotFound from "../pages/NotFound";
import Welcome from "../pages/Welcome"; // 👈 добавили
import DictionaryPage from "../features/dictionary/pages/DictionaryPage";
import SettingsPage from "../features/settingsPage/pages/SettingsPage";

import AuthLayout from "../layout/AuthLayout";
import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/AdminLayout";

import ProtectedRoute from "../components/common/ProtectedRoute";
import AdminRoute from "../components/common/AdminRoute";
import {
  AdminDashboard,
  AdminLessonsPage,
  AdminUsersPage,
} from "../features/admin";


export default function AppRouter() {
  useAutoLogin();

  return (
    <Routes>
      {/* --- Публичные маршруты --- */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Welcome />} /> {/* 👈 Показываем Welcome */}
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/lessons/:id" element={<LessonDetailPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dictionary" element={<DictionaryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* --- Авторизация --- */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* --- Админ --- */}
      <Route
        element={
          <ProtectedRoute>
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/lessons" element={<AdminLessonsPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
      </Route>

      {/* --- 404 --- */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
