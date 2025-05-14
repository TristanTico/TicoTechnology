import axiosInstance from "./axios";
import { QueryPagination } from "@/types/types";

export const getAllOrdersRequest = async (query: QueryPagination) => {
  const token = localStorage.getItem("accessToken");
  return await axiosInstance.get("/ordenes/get-all-ordenes", {
    params: query,
    headers: { Authorization: `Bearer ${token}` },
  });
};
