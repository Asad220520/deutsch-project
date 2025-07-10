import { Routes, Route } from "react-router-dom";

// --- Auth
import useAutoLogin from "../features/auth/useAutoLogin";
import Login from "../features/auth/LoginForm";

// --- Public pages (user)
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import LessonsPage from "../features/lessons/pages/LessonsPage";
import LessonDetailPage from "../features/lessons/pages/LessonDetailPage";
import NotFound from "../pages/NotFound";

// --- Layouts
import AuthLayout from "../layout/AuthLayout";
import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/AdminLayout";

// --- Route guards
import ProtectedRoute from "../components/common/ProtectedRoute";
import AdminRoute from "../components/common/AdminRoute";

// --- Admin pages
import {
  AdminDashboard,
  AdminLessonsPage,
  AdminUsersPage,
} from "../features/admin";

export default function AppRouter() {
  useAutoLogin();

  return (
    <Routes>
      {/* --- Гостевые маршруты --- */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* --- Пользовательские защищённые маршруты --- */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/lessons/:id" element={<LessonDetailPage />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* --- Админ маршруты вложенные --- */}
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
