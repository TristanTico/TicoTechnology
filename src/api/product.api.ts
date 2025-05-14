import axiosInstance from "./axios";
import { QueryPagination } from "@/types/types";

export const getAllProductsRequest = async (query: QueryPagination) => {
  const token = localStorage.getItem("accessToken");
  return await axiosInstance.get("/productos/getProductos", {
    params: query,
    headers: { Authorization: `Bearer ${token}` },
  });
};
