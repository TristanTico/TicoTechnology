import { useState } from "react";
import { Pagination } from "./Pagination";
import { Tbody } from "./Tbody";

export const Table = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");

  return (
    <main className="flex-1 overflow-auto p-8">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4">
          <div className="flex flex-wrap gap-4 mb-4">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded-lg w-64"
            />
            <select
              className="p-2 border rounded-lg"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">Todos los Roles</option>
              <option value="Admin">Admin</option>
              <option value="Cliente">Cliente</option>
            </select>
            <select className="p-2 border rounded-lg">
              <option value="">Todos los Estados</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Cédula
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Correo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>
              <Tbody searchTerm={searchTerm} selectedRole={selectedRole} />
            </table>
          </div>
          <Pagination />
        </div>
      </div>
    </main>
  );
};
