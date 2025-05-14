import { create } from "zustand";
import { getAllProductsRequest } from "@/api/product.api";
import { ProductState } from "@/types/types";

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: false,
  error: null,
  page: 1,
  limit: 5,
  totalPages: 1,
  fetchProducts: async ({ page, limit }) => {
    set({ isLoading: true, error: null });
    try {
      const res = await getAllProductsRequest({ page, limit });
      setTimeout(() => {
        set({
          products: res.data.data,
          page: res.data.page,
          limit: res.data.limit,
          totalPages: res.data.totalPages,
          isLoading: false,
        });
      }, 1000);
      console.log(res.data.data);
      return res.data.data;
    } catch (error: any) {
      console.log(error);
      set({
        error: error.response?.data?.message || "Error al obtener productos",
        isLoading: false,
      });
    }
  },
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
}));
