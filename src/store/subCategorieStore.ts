import { create } from "zustand";
import { createSub, getAllSubCategoriesRequest } from "@/api/subcategorie.api";
import { SubcategorieState } from "@/types/types";
import { showToast } from "@/lib/showToast";

export const useSubcategorieStore = create<SubcategorieState>((set) => ({
  subcategories: [],
  isLoading: false,
  error: null,
  page: 1,
  limit: 5,
  totalPages: 1,
  fetchSubCategories: async ({ page, limit }) => {
    set({ isLoading: true, error: null });
    try {
      const res = await getAllSubCategoriesRequest({ page, limit });
      setTimeout(() => {
        set({
          subcategories: res.data.data,
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
        error:
          error.response?.data?.message || "Error al obtener subcategorias",
        isLoading: false,
      });
    }
  },
  createSubCategory: async (subCategory) => {
    try {
      const res = await createSub(subCategory);
      showToast.success(res.data.message);
      const { fetchSubCategories, page, limit } = useSubcategorieStore.getState();
      await fetchSubCategories({ page, limit });
      return true;
    } catch (error: any) {
      console.error(error);
      showToast.error(
        error?.response?.data?.message || "Error al registrar subcategoria"
      );
      return false;
    }
  },
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
}));
