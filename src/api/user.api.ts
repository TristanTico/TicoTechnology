import axiosInstance from "./axios";
import { CreateUser, QueryPagination, RegisterUser } from "@/types/types";

export const registerRequest = async (registerUser: RegisterUser) => {
  return await axiosInstance.post("/usuarios/crear-usuario", registerUser);
};

export const getAllUsersRequest = async (query: QueryPagination) => {
  const token = localStorage.getItem("accessToken");
  return await axiosInstance.get("/usuarios/obtener-usuarios", {
    params: query,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createUser = async (user: CreateUser) => {
  const token = localStorage.getItem("accessToken");
  return await axiosInstance.post("/usuarios/crear-usuario-admin", user, {
    headers: { Authorization: `Bearer ${token}` },
  });
};