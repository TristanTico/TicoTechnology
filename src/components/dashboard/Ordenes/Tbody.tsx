import { useOrderStore } from "@/store/orderStore";
import { Eye } from "lucide-react";
import { useEffect } from "react";

interface BodyProps {
  searchTerm: string;
}
export const Tbody: React.FC<BodyProps> = ({ searchTerm }) => {
  const fetchOrders = useOrderStore((state) => state.fetchOrders);
  const orders = useOrderStore((state) => state.orders);
  const isLoading = useOrderStore((state) => state.isLoading);
  const error = useOrderStore((state) => state.error);
  const page = useOrderStore((state) => state.page);
  const limit = useOrderStore((state) => state.limit);

  useEffect(() => {
    fetchOrders({ page, limit });
  }, [fetchOrders, page, limit]);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.cedulaUsuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.estadoOrden.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
  if (isLoading) {
    return (
      <tbody className="bg-white divide-y divide-gray-200">
        {[...Array(5)].map((_, index) => (
          <tr key={index} className="animate-pulse">
            {[...Array(6)].map((_, i) => (
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
      {filteredOrders.map((order) => (
        <tr key={order.ordenes_id} className="hover:bg-gray-50 ">
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
            {order.ordenes_id}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
            {order.fechaOrden}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
            {order.totalOrden}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
            {order.estadoOrden}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
            {order.cedulaUsuario}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
            <div className="flex space-x-2">
              <button className="p-1 text-green-600 hover:text-green-800">
                <Eye />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
