import { showToast } from "@/lib/showToast";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
interface CartSummaryProps {
  subTotal: number;
  formatCurrency: (value: number) => string;
}
export const CartSummary = ({ subTotal, formatCurrency }: CartSummaryProps) => {
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const createOrder = useOrderStore((state) => state.createOrder);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const handleCreateOrder = async () => {
    if (!isAuthenticated) {
      showToast.error("Debes iniciar sesión para realizar la compra");
      return;
    }
    if (cartItems.length === 0) return;
    const detalles = cartItems.map((item) => ({
      productos_id: item.productos_id,
      precioUnitario: item.precioProducto,
      cantidad: item.cantidad,
    }));
    const success = await createOrder({ detalles });
    if (success) clearCart();
  };
  return (
    <div className="lg:w-1/3">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Resumen de Compra
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{formatCurrency(subTotal)}</span>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">{formatCurrency(subTotal)}</span>
            </div>
          </div>
        </div>
        <button
          className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
          onClick={handleCreateOrder}
        >
          Guardar Orden
        </button>
      </div>
    </div>
  );
};
