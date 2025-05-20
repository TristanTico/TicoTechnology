import { AuthUser } from "@/types/types";
import axiosInstance from "./axios";

export const loginRequest = async (authuser: AuthUser) => {
  return await axiosInstance.post("/auth/login", authuser);
};

export const getRolUser = async () => {
  const token = localStorage.getItem("accessToken");
  return await axiosInstance.get("/usuarios/obtener-rol-usuario", {
    headers: { Authorization: `Bearer ${token}` },
  });
};
