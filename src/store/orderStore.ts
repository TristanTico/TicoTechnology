import { create } from "zustand";
import { getAllOrdersRequest, createOrder } from "@/api/order.api";
import { OrderState } from "@/types/types";
import { showToast } from "@/lib/showToast";

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  isLoading: false,
  error: null,
  page: 1,
  limit: 5,
  totalPages: 1,
  fetchOrders: async ({ page, limit }) => {
    set({ isLoading: true });
    try {
      const orders = await getAllOrdersRequest({ page, limit });
      setTimeout(() => {
        set({
          orders: orders.data.data,
          page: orders.data.page,
          limit: orders.data.limit,
          totalPages: orders.data.totalPages,
          isLoading: false,
        });
      }, 1000);
      console.log(orders.data.data);
      return orders.data.data;
    } catch (error: any) {
      console.log(error);
      set({
        error: error.response?.data?.message || "Error al obtener ordenes",
        isLoading: false,
      });
    }
  },
  createOrder: async (order) => {
    try {
      const res = await createOrder(order);
      showToast.success(res.data.message);
      return true;
    } catch (error: any) {
      console.log(error);
      set({
        error: error.response?.data?.message || "Error al crear la orden",
        isLoading: false,
      });
      return false;
    }
  },
  setPage: (page: number) => set({ page }),
  setLimit: (limit: number) => set({ limit }),
}));
