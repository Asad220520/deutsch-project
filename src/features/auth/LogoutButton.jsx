// src/features/auth/LogoutButton.jsx
import { useDispatch } from "react-redux";
import { auth } from "../../services/firebase";
import { signOut } from "firebase/auth";
import { logout } from "./authSlice";

export default function LogoutButton() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Выйти
    </button>
  );
}
