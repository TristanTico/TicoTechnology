import { create } from "zustand";
import {
  createProduct,
  getAllProductsRequest,
  getProductsFeature,
} from "@/api/product.api";
import { ProductState } from "@/types/types";
import { showToast } from "@/lib/showToast";

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  productsHome: null,
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
  createProduct: async (formData) => {
    try {
      const res = await createProduct(formData);
      showToast.success(res.data.message);
      const { fetchProducts, page, limit } = useProductStore.getState();
      await fetchProducts({ page, limit });
      return true;
    } catch (error: any) {
      console.log(error);
      showToast.error(
        error?.response?.data?.message || "Error al registrar producto"
      );
      return false;
    }
  },
  fetchProductsHome: async () => {
    set({ error: null });
    try {
      const res = await getProductsFeature();
      set({ productsHome: res.data });
      console.log(res.data);
      return res.data;
    } catch (error: any) {
      console.log(error);
      set({
        error: error.response?.data?.message || "Error al obtener productos",
      });
    }
  },
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
}));
