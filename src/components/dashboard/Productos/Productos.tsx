import { Plus } from "lucide-react";
import { Table } from "./Table";

export const Productos = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Productos</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
          <Plus className="mr-2" /> Añadir Producto
        </button>
      </div>
      <Table />
    </div>
  );
};
