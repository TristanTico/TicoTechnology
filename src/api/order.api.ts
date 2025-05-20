import axiosInstance from "./axios";
import { QueryPagination, OrdenCreate } from "@/types/types";

export const getAllOrdersRequest = async (query: QueryPagination) => {
  const token = localStorage.getItem("accessToken");
  return await axiosInstance.get("/ordenes/get-all-ordenes", {
    params: query,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createOrder = async (order: OrdenCreate) => {
  const token = localStorage.getItem("accessToken");
  return await axiosInstance.post("/ordenes/create-orden", order, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


