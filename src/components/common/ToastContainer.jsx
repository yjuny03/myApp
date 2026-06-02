// src/components/common/ToastContainer.jsx

import { useAppContext } from "../../hooks/useAppContext.js";

function ToastContainer() {
  const { toasts, removeToast } = useAppContext();

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          className={`toast toast-${toast.type}`}
          key={toast.id}
          onClick={() => removeToast(toast.id)}
        >
          <span>
            {toast.type === "success" && "✅"}
            {toast.type === "error" && "⚠️"}
            {toast.type === "info" && "💬"}
          </span>

          <p>{toast.message}</p>
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;