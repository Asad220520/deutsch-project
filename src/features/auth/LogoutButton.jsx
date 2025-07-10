// src/features/auth/LogoutButton.jsx
export default function LogoutButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Выйти
    </button>
  );
}
