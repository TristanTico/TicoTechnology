import { Plus } from "lucide-react";
import { Table } from "./Table";

export const Usuarios = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
          <Plus className="mr-2" /> Añadir Usuario
        </button>
      </div>

      <Table />
    </div>
  );
};
