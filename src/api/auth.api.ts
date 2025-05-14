import { AuthUser } from "@/types/types"
import axiosInstance from "./axios";

export const loginRequest = async (authuser: AuthUser) => {
  return await axiosInstance.post("/auth/login", authuser);
}