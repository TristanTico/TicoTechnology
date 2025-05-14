import { useCategorieStore } from "@/store/categorieStore";
import { Edit2, Trash2 } from "lucide-react";
import { useEffect } from "react";

interface BodyProps {
  searchTerm: string;
}
export const Tbody: React.FC<BodyProps> = ({ searchTerm }) => {
  const fetchCategories = useCategorieStore((state) => state.fetchCategories);
  const categories = useCategorieStore((state) => state.categories);
  const isLoading = useCategorieStore((state) => state.isLoading);
  const error = useCategorieStore((state) => state.error);
  const page = useCategorieStore((state) => state.page);
  const limit = useCategorieStore((state) => state.limit);

  useEffect(() => {
    fetchCategories({ page, limit });
  }, [fetchCategories, page, limit]);

  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.nombreCategoria
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
  if (isLoading) {
    return (
      <tbody className="bg-white divide-y divide-gray-200">
        {[...Array(5)].map((_, index) => (
          <tr key={index} className="animate-pulse">
            {[...Array(3)].map((_, i) => (
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
      {filteredCategories.map((category) => (
        <tr key={category.categorias_id} className="hover:bg-gray-50 ">
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
            {category.categorias_id}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
            {category.nombreCategoria}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
            <div className="flex space-x-2">
              <button className="p-1 text-blue-600 hover:text-blue-800">
                <Edit2 />
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
