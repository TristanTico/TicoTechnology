import { create } from "zustand";
import { loginRequest } from "@/api/auth.api";
import { AuthState } from "@/types/types";
import { showToast } from "@/lib/showToast";
import { registerRequest } from "@/api/user.api";

export const useAuthStore = create<AuthState>((set) => ({
  userLogin: localStorage.getItem("userLogin")
    ? JSON.parse(localStorage.getItem("userLogin")!)
    : null,
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  isAuthenticated: !!localStorage.getItem("accessToken"),
  login: async (authUser) => {
    set({ isAuthenticated: false });
    try {
      const res = await loginRequest(authUser);
      const { userLogin, accessToken, refreshToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userLogin", JSON.stringify(userLogin));
      showToast.success("Bienvenid@ " + userLogin.nombreUsuario);
      set({ userLogin, accessToken, refreshToken, isAuthenticated: true });
      return true;
    } catch (error: any) {
      console.error(error);
      showToast.error(
        error?.response?.data?.message || "Error al iniciar sesión"
      );
      set({ isAuthenticated: false });
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userLogin");
    showToast.success("Cierre de sesión exitoso");
    set({
      userLogin: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },
  register: async (registerUser) => {
    try {
      const res = await registerRequest(registerUser);
      showToast.success(res.data.message);
      return true;
    } catch (error: any) {
      console.error(error);
      showToast.error(
        error?.response?.data?.message || "Error al registrar usuario"
      );
      return false;
    }
  },
}));
