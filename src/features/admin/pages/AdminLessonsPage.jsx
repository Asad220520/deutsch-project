// pages/admin/AdminLessonsPage.jsx
import LessonForm from "../../lessons/components/LessonForm";
import AdminLessonList from "../components/AdminLessonList";

export default function AdminLessonsPage() {
  return (
    <div className="flex">
      <AdminLessonList />
      <LessonForm/>
    </div>
  );
}
