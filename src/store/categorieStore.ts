import { create } from "zustand";
import {
  getAllCategoriesRequest,
  createCategoryRequest,
  getBySelect,
} from "@/api/categorie.api";
import { CategorieState } from "@/types/types";
import { showToast } from "@/lib/showToast";

export const useCategorieStore = create<CategorieState>((set) => ({
  categories: [],
  categoriesSelect: [],
  isLoading: false,
  error: null,
  page: 1,
  limit: 5,
  totalPages: 1,
  fetchCategories: async ({ page, limit }) => {
    set({ isLoading: true, error: null });
    try {
      const res = await getAllCategoriesRequest({ page, limit });
      setTimeout(() => {
        set({
          categories: res.data.data,
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
        error: error.response?.data?.message || "Error al obtener categorias",
        isLoading: false,
      });
    }
  },
  createCategory: async (category) => {
    try {
      const res = await createCategoryRequest(category);
      showToast.success(res.data.message);
      const { fetchCategories, page, limit } = useCategorieStore.getState();
      await fetchCategories({ page, limit });

      return true;
    } catch (error: any) {
      console.error(error);
      showToast.error(
        error?.response?.data?.message || "Error al registrar categoria"
      );
      return false;
    }
  },
  fetchBySelect: async () => {
    set({ error: null });
    try {
      const res = await getBySelect();
      set({
        categoriesSelect: res.data,
      });
      console.log(res.data);
      return res.data;
    } catch (error: any) {
      console.log(error);
      set({
        error: error.response?.data?.message || "Error al obtener categorias",
      });
    }
  },
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
}));
