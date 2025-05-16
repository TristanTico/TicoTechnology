import { Plus } from "lucide-react";
import { Table } from "./Table";
import { useState, useCallback } from "react";
import { ModalUser } from "./Gestion/ModalUser";

export const Usuarios = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);
  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center cursor-pointer"
            onClick={toggleModal}
          >
            <Plus className="mr-2" /> Añadir Usuario
          </button>
        </div>

        <Table />
      </div>
      <ModalUser isOpen={isModalOpen} onClose={toggleModal} />
    </>
  );
};
