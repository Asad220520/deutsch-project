import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Профиль</h2>
      {user ? (
        <div>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>UID:</strong> {user.uid}
          </p>
        </div>
      ) : (
        <p>Нет данных пользователя</p>
      )}
    </div>
  );
}
