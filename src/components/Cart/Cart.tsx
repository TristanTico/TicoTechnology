import { useState, useEffect, useMemo } from "react";
import { useCartStore } from "@/store/cartStore";
import { CartSkeleton } from "../Loading-skeleton/CartSkeleton";
import { CartItemRow } from "./CartItemRow";
import { CartSummary } from "./CartSummary";

export const Cart = () => {
  const [loading, setLoading] = useState(true);
  const cartItems = useCartStore((state) => state.items);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const subtotalGeneral = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) => acc + item.precioProducto * item.cantidad,
        0
      ),
    [cartItems]
  );

  const formatCurrency = (value: number): string =>
    new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 2,
    }).format(value);

  if (loading) return <CartSkeleton />;

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold mb-4">Tu carrito está vacío</h2>
        <p className="text-gray-600">
          Añade productos a tu carrito para comenzar a comprar
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Carrito de Compras
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
              <table className="w-full min-w-max">
                <thead>
                  <tr className="text-left bg-gray-50">
                    <th className="py-4 px-6">Producto</th>
                    <th className="py-4 px-6">Precio</th>
                    <th className="py-4 px-6">Cantidad</th>
                    <th className="py-4 px-6">Subtotal</th>
                    <th className="py-4 px-6">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <CartItemRow
                      key={item.productos_id}
                      item={item}
                      formatCurrency={formatCurrency}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <CartSummary
            subTotal={subtotalGeneral}
            formatCurrency={formatCurrency}
          />
        </div>
      </div>
    </div>
  );
};
