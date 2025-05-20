import { showToast } from "@/lib/showToast";
import { CartStore } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product) => {
        const existing = get().items.find(
          (item) => item.productos_id === product.productos_id
        );
        if (existing) {
          showToast.customMessage("Este producto ya está en el carrito");
          return;
        }
        set({ items: [...get().items, { ...product, cantidad: 1 }] });
        showToast.success(`El producto ${product.nombreProducto} fue agregado al carrito`);
      },
      removeFromCart: (productos_id) => {
        set({
          items: get().items.filter(
            (item) => item.productos_id !== productos_id
          ),
        });
        showToast.customMessage("Producto eliminado del carrito");
      },
      clearCart: () => {
        set({ items: [] });
      },
      increaseQuantity: (productos_id) => {
        set({
          items: get().items.map((item) =>
            item.productos_id === productos_id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          ),
        });
        showToast.customMessage("Cantidad aumentada");
      },
      decreaseQuantity: (productos_id) => {
        set({
          items: get().items.map((item) =>
            item.productos_id === productos_id && item.cantidad > 1
              ? { ...item, cantidad: item.cantidad - 1 }
              : item
          ),
        });
        showToast.customMessage("Cantidad disminuida");
      },
    }),
    {
      name: "cart",
    }
  )
);
