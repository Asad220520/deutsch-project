import { motion } from "framer-motion";
import clsx from "clsx";

export default function ReusableButton({
  children,
  onClick,
  disabled,
  loading,
  type = "button",
}) {
  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.97 }}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "w-full px-4 py-2 rounded-xl text-white font-medium transition duration-200",
        loading
          ? "bg-blue-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700",
        disabled && "opacity-60"
      )}
    >
      {loading ? "Загрузка..." : children}
    </motion.button>
  );
}
