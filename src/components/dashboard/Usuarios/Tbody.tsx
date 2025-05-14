import { useUserStore } from "@/store/userStore";
import { Edit2, Eye, Trash2 } from "lucide-react";
import { useEffect } from "react";

interface BodyProps {
  searchTerm: string;
  selectedRole: string;
}
export const Tbody: React.FC<BodyProps> = ({ searchTerm, selectedRole }) => {
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const users = useUserStore((state) => state.users);
  const isLoading = useUserStore((state) => state.isLoading);
  const error = useUserStore((state) => state.error);
  const page = useUserStore((state) => state.page);
  const limit = useUserStore((state) => state.limit);

  useEffect(() => {
    fetchUsers({ page, limit });
  }, [fetchUsers, page, limit]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.cedulaUsuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.correoUsuario.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole =
      selectedRole === "" ||
      user.rol.toLowerCase() === selectedRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

  if (isLoading) {
    return (
      <tbody className="bg-white divide-y divide-gray-200">
        {[...Array(5)].map((_, index) => (
          <tr key={index} className="animate-pulse">
            {[...Array(5)].map((_, i) => (
              <td key={i} className="px-6 py-4">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  if (error) {
    return (
      <tbody className="bg-white divide-y divide-gray-200">
        <tr>
          <td colSpan={6} className="text-center py-4 text-sm text-red-600">
            {error}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="bg-white  divide-y divide-gray-200 ">
      {filteredUsers.map((user) => (
        <tr key={user.cedulaUsuario} className="hover:bg-gray-50 ">
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
            {user.cedulaUsuario}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
            {user.nombreUsuario}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
            {user.correoUsuario}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
            {user.rol}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
            <div className="flex space-x-2">
              <button className="p-1 text-blue-600 hover:text-blue-800">
                <Edit2 />
              </button>
              <button className="p-1 text-green-600 hover:text-green-800">
                <Eye />
              </button>
              <button className="p-1 text-red-600 hover:text-red-800">
                <Trash2 />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
