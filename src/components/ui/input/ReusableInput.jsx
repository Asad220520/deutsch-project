import { useState } from "react";
import InputMask from "react-input-mask";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiPhone } from "react-icons/fi";
import clsx from "clsx";

export default function ReusableInput({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  error,
  disabled = false,
  mask, // 📌 добавлено
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const renderIcon = () => {
    if (type === "email") return <FiMail className="text-gray-400" />;
    if (type === "password") return <FiLock className="text-gray-400" />;
    if (type === "tel") return <FiPhone className="text-gray-400" />;
    return null;
  };

  const inputClass = clsx(
    "w-full pl-10 pr-10 py-2 text-gray-800 border rounded-xl transition duration-200 focus:outline-none focus:ring-2",
    error
      ? "border-red-500 focus:ring-red-300"
      : "border-gray-300 focus:ring-blue-300",
    disabled && "bg-gray-100 cursor-not-allowed text-gray-400"
  );

  const commonProps = {
    value,
    onChange,
    placeholder,
    disabled,
    type: inputType,
    className: inputClass,
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <span className="absolute left-3">{renderIcon()}</span>

        {mask ? (
          <InputMask mask={mask} {...commonProps} />
        ) : (
          <motion.input whileFocus={{ scale: 1.01 }} {...commonProps} />
        )}

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 text-gray-500 focus:outline-none"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
