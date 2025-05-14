import axiosInstance from "./axios";
import { QueryPagination, SubCategoriaCreate } from "@/types/types";

export const getAllSubCategoriesRequest = async (query: QueryPagination) => {
  const token = localStorage.getItem("accessToken");
  return await axiosInstance.get("/subcategorias/obtener-subcategorias", {
    params: query,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createSub = async (subCategoriaCreate: SubCategoriaCreate) => {
  const token = localStorage.getItem("accessToken");
  return await axiosInstance.post("/subcategorias/crear-subcategoria", subCategoriaCreate, {
    headers: { Authorization: `Bearer ${token}` },
  });
};