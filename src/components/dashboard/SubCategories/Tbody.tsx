import { useSubcategorieStore } from "@/store/subCategorieStore";
import { Edit2, Trash2 } from "lucide-react";
import { useEffect } from "react";

interface BodyProps {
  searchTerm: string;
}
export const Tbody: React.FC<BodyProps> = ({ searchTerm }) => {
  const fetchSubCategories = useSubcategorieStore((state) => state.fetchSubCategories);
  const subcategories = useSubcategorieStore((state) => state.subcategories);
  const isLoading = useSubcategorieStore((state) => state.isLoading);
  const error = useSubcategorieStore((state) => state.error);
  const page = useSubcategorieStore((state) => state.page);
  const limit = useSubcategorieStore((state) => state.limit);

  useEffect(() => {
    fetchSubCategories({ page, limit });
  }, [fetchSubCategories, page, limit]);

  const filteredSubcategories = subcategories.filter((subcategory) => {
    const matchesSearch = subcategory.nombreSubcategoria
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
  if (isLoading) {
    return (
      <tbody className="bg-white divide-y divide-gray-200">
        {[...Array(5)].map((_, index) => (
          <tr key={index} className="animate-pulse">
            {[...Array(4)].map((_, i) => (
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
      {filteredSubcategories.map((subcategory) => (
        <tr key={subcategory.subCategorias_id } className="hover:bg-gray-50 ">
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
            {subcategory.subCategorias_id }
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
            {subcategory.nombreSubcategoria}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
            {subcategory.categorias_id}
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
