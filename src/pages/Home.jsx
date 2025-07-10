import LogoutButton from "../features/auth/LogoutButton";

export default function Home() {
  return (
    <div className="text-xl font-semibold">
      Добро пожаловать! Выберите урок, чтобы начать изучение.
      <LogoutButton />
    </div>
  );
}
