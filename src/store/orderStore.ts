import { create } from "zustand";
import { getAllOrdersRequest } from "@/api/order.api";
import { OrderState } from "@/types/types";

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
  setPage: (page: number) => set({ page }),
  setLimit: (limit: number) => set({ limit }),
}));
