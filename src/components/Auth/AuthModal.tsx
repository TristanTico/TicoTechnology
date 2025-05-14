import { X } from "lucide-react";
import { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";
interface AuthProps {
  isOpen: boolean;
  onClose: () => void;
}
export const AuthModal: React.FC<AuthProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>("login");
  const handleRegisterSuccess = () => {
    setActiveTab("login");
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative animate-slideDown opacity-0 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 ${
              activeTab === "login"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 ${
              activeTab === "register"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {activeTab === "login" ? (
          <Login onSuccess={onClose} />
        ) : (
          <Register onSuccess={handleRegisterSuccess} />
        )}
      </div>
    </div>
  );
};
