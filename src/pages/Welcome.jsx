import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ReusableButton from "../components/ui/button/ReusableButton";

export default function Welcome() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // Если пользователь уже вошел — перенаправить его на /lessons
  useEffect(() => {
    if (user) {
      navigate("/lessons");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Добро пожаловать в Deutsch Learn!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
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
