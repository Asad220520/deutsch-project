// components/ui/Modal.js
export default function Modal({
  isOpen,
  title,
  children,
  onConfirm,
  onCancel,
  confirmText = "Да",
  cancelText = "Нет",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center shadow-lg">
        {title && <h3 className="mb-4 text-lg font-semibold">{title}</h3>}
        <div className="mb-4">{children}</div>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            {confirmText}
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
