import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../features/admin";

export default function AdminLayout() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-4">
        <Outlet /> {/* Обязательно! */}
      </div>
    </div>
  );
}
