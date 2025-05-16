import { X } from "lucide-react";
import { FormProducts } from "./FormProducts";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const ModalProducts: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6 relative animate-slideDown opacity-0 animate-fade-in mx-4 sm:mx-0">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
        >
          <X size={24} />
        </button>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Crear Producto
        </h1>
        <FormProducts onSuccess={onClose} />
      </div>
    </div>
  );
};
