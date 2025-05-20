import axiosInstance from "./axios";
import { QueryPagination } from "@/types/types";

export const getAllProductsRequest = async (query: QueryPagination) => {
  const token = localStorage.getItem("accessToken");
  return await axiosInstance.get("/productos/getProductos", {
    params: query,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createProduct = async (product: FormData) => {
  const token = localStorage.getItem("accessToken");
  return await axiosInstance.post("/productos/crear-producto", product, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getProductsFeature = async () => {
  return await axiosInstance.get("/productos/getProductosDestacados");
};
