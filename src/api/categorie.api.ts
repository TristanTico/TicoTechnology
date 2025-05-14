import axiosInstance from "./axios";
import { CategoriaTable, QueryPagination } from "@/types/types";

export const getAllCategoriesRequest = async (query: QueryPagination) => {
  const token = localStorage.getItem("accessToken");
  return await axiosInstance.get("/categorias/get-categorias", {
    params: query,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createCategoryRequest = async (category: CategoriaTable) => {
  const token = localStorage.getItem("accessToken");
  return await axiosInstance.post("/categorias/crearCategoria", category, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getBySelect = async () => {
  const token = localStorage.getItem("accessToken");
  return await axiosInstance.get("/categorias/get-categorias-select", {
    headers: { Authorization: `Bearer ${token}` },
  });
};