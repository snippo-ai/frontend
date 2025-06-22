import { CheckCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: "success" | "error";
}

const Toast = ({
  message,
  isVisible,
  onClose,
  type = "success",
}: ToastProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(onClose, 300); // Wait for animation to complete
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`
          flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border
          transform transition-all duration-300 ease-in-out
          ${
            isAnimating
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }
          ${
            type === "success"
              ? "bg-green-900/90 border-green-700 text-green-100"
              : "bg-red-900/90 border-red-700 text-red-100"
          }
        `}
      >
        <CheckCircle className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 p-1 rounded-md hover:bg-black/20 transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
