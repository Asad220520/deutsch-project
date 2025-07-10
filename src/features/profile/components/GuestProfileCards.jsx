import { useNavigate } from "react-router-dom";
import ReusableButton from "../../../components/ui/button/ReusableButton";

export default function GuestProfileCards() {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-10 space-y-6">
      <h2 className="text-2xl font-semibold">Вы не вошли в аккаунт</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <Card
          title="Уже есть аккаунт?"
          text="Продолжите с того места, где вы остановились."
          buttonText="Войти"
          onClick={() => navigate("/login")}
        />
        <Card
          title="Впервые с нами?"
          text="Создайте аккаунт и начните обучение!"
          buttonText="Зарегистрироваться"
          onClick={() => navigate("/register")}
        />
        <Card
          title="Просто попробовать?"
          text="Изучайте уроки без регистрации. Прогресс не сохранится."
          buttonText="Начать без регистрации"
          onClick={() => navigate("/lessons")}
        />
      </div>
    </div>
  );
}

function Card({ title, text, buttonText, onClick }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center transition hover:shadow-2xl">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{text}</p>
      <ReusableButton onClick={onClick}>{buttonText}</ReusableButton>
    </div>
  );
}
