import { useDispatch } from "react-redux";
import LessonForm from "../../lessons/components/LessonForm";
import { addLesson } from "../../lessons/lessonsSlice";
import { createLesson } from "../../lessons/lessonsService";

export default function AdminLessonCreate() {
  const dispatch = useDispatch();

  const handleSave = async (lesson) => {
    try {
      const saved = await createLesson(lesson);
      dispatch(addLesson(saved));
      alert("Урок успешно создан!");
    } catch (err) {
      console.error("Ошибка при сохранении урока:", err);
      alert("Ошибка при сохранении урока");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Создать урок</h1>
      <LessonForm onSave={handleSave} />
    </div>
  );
}
