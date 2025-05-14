import { useProductStore } from "@/store/productStore";
import { Edit2, Eye, Trash2 } from "lucide-react";
import { useEffect } from "react";

interface BodyProps {
  searchTerm: string;
}
export const Tbody: React.FC<BodyProps> = ({ searchTerm }) => {
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const products = useProductStore((state) => state.products);
  const isLoading = useProductStore((state) => state.isLoading);
  const error = useProductStore((state) => state.error);
  const page = useProductStore((state) => state.page);
  const limit = useProductStore((state) => state.limit);

  useEffect(() => {
    fetchProducts({ page, limit });
  }, [fetchProducts, page, limit]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.nombreProducto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.subcategorias.categorias.nombreCategoria
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.subcategorias.nombreSubcategoria
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
  if (isLoading) {
    return (
      <tbody className="bg-white divide-y divide-gray-200">
        {[...Array(5)].map((_, index) => (
          <tr key={index} className="animate-pulse">
            {[...Array(7)].map((_, i) => (
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
      {filteredProducts.map((product) => (
        <tr key={product.productos_id} className="hover:bg-gray-50 ">
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
            <img
              src={`${import.meta.env.VITE_API_URL}/${product.imagenPrincipal.replace(/\\/g, '/')}`}
              alt={product.nombreProducto}
              className="h-20 w-24 object-cover rounded"
            />
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
            {product.nombreProducto}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
            {product.precioProducto}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
            {product.stockProducto}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
            {product.subcategorias.categorias.nombreCategoria}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
            {product.subcategorias.nombreSubcategoria}
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
