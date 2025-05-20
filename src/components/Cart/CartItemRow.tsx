import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

interface CartItem {
  productos_id: number;
  nombreProducto: string;
  precioProducto: number;
  imagenPrincipal: string;
  slug: string;
  destacado: boolean;
  cantidad: number;
}
interface CartItemRowProps {
  item: CartItem;
  formatCurrency: (value: number) => string;
}
export const CartItemRow = ({ item, formatCurrency }: CartItemRowProps) => {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  return (
    <tr className="border-t border-gray-100">
      <td className="py-4 px-6">
        <div className="flex items-center gap-4">
          <img
            src={`${
              import.meta.env.VITE_API_URL
            }/${item.imagenPrincipal.replace(/\\/g, "/")}`}
            alt={item.nombreProducto}
            onError={(e) => (e.currentTarget.src = "/fallback.jpg")}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <span className="font-medium text-gray-800 hover:underline cursor-pointer">
            {item.nombreProducto}
          </span>
        </div>
      </td>
      <td className="py-4 px-6">{formatCurrency(item.precioProducto)}</td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={item.cantidad <= 1}
            onClick={() => decreaseQuantity(item.productos_id)}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50"
            aria-label="Disminuir cantidad"
          >
            <Minus className="text-gray-600 cursor-pointer" />
          </button>
          <span className="w-8 text-center">{item.cantidad}</span>
          <button
            type="button"
            onClick={() => increaseQuantity(item.productos_id)}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Aumentar cantidad"
          >
            <Plus className="text-gray-600 cursor-pointer" />
          </button>
        </div>
      </td>
      <td className="py-4 px-6">
        {formatCurrency(item.precioProducto * item.cantidad)}
      </td>
      <td className="py-4 px-6">
        <button
          type="button"
          onClick={() => removeFromCart(item.productos_id)}
          className="text-red-500 hover:text-red-700 transition-colors"
          aria-label="Eliminar producto"
        >
          <Trash2 size={20} />
        </button>
      </td>
    </tr>
  );
};
