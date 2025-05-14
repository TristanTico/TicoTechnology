import { Plus } from "lucide-react";
import { Table } from "./Table";
import { useCallback, useState } from "react";
import { ModalCategory } from "./Gestion/ModalCategory";

export const Categorias = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const toggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);
  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestión de Categorias</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center cursor-pointer" onClick={toggleModal}>
            <Plus className="mr-2" /> Añadir Categoria
          </button>
        </div>
        <Table />
      </div>
      <ModalCategory isOpen={isModalOpen} onClose={toggleModal} />
    </>
  );
};
