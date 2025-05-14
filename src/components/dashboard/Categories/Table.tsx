import { useState } from "react";
import { Pagination } from "./Pagination";
import { Tbody } from "./Tbody";
export const Table = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
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
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Id Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Nombre Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>
              <Tbody searchTerm={searchTerm} />
            </table>
          </div>
          <Pagination />
        </div>
      </div>
    </main>
  );
};
