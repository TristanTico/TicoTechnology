import { X } from "lucide-react";
import { FormCategory } from "./FormCategory";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const ModalCategory: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative animate-slideDown opacity-0 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
        >
          <X size={24} />
        </button>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Crear Categoria</h2>
        <FormCategory onSuccess={onClose} />
      </div>
    </div>
  );
};
