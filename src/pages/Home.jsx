import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../features/auth/LogoutButton";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import Modal from "../components/ui/modal/Modal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleConfirmLogout = async () => {
    try {
      await signOut(auth);
      closeModal();
      navigate("/login");
    } catch (error) {
      console.error("Ошибка выхода:", error);
      closeModal();
    }
  };

  return (
    <div className="text-xl font-semibold space-y-4">
      <p>Добро пожаловать! Выберите урок, чтобы начать изучение.</p>
      <LogoutButton onClick={openModal} />

      <Modal
        isOpen={isModalOpen}
        title="Подтверждение выхода"
        onConfirm={handleConfirmLogout}
        onCancel={closeModal}
        confirmText="Выйти"
        cancelText="Отмена"
      >
        Вы уверены, что хотите выйти?
      </Modal>
    </div>
  );
}
