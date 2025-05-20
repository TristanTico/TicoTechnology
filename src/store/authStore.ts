import { create } from "zustand";
import { loginRequest, getRolUser } from "@/api/auth.api";
import { registerRequest } from "@/api/user.api";
import { AuthState } from "@/types/types";
import { showToast } from "@/lib/showToast";

const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

const clearSession = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const useAuthStore = create<AuthState>((set) => ({
  userLogin: null,
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  isAuthenticated: !!localStorage.getItem("accessToken"),

  login: async (authUser) => {
    set({ isAuthenticated: false });
    try {
      const res = await loginRequest(authUser);
      const { accessToken, refreshToken } = res.data;

      if (!accessToken || !refreshToken) throw new Error("Tokens no válidos");

      saveTokens(accessToken, refreshToken);
      set({ accessToken, refreshToken, isAuthenticated: true });

      const resRol = await getRolUser();
      const userLogin = resRol.data;

      showToast.success("Bienvenid@ " + userLogin.nombreUsuario);
      set({ userLogin });

      return true;
    } catch (error: any) {
      console.error("Error en login:", error);
      showToast.error(
        error?.response?.data?.message || "Error al iniciar sesión"
      );
      clearSession();
      set({ isAuthenticated: false });
      return false;
    }
  },

  loadUserRole: async () => {
    try {
      const resRol = await getRolUser();
      const userLogin = resRol.data;
      console.log("Rol cargado:", userLogin);
      set({ userLogin });
    } catch (error) {
      console.error("Error al cargar el rol:", error);
      clearSession();
      set({
        userLogin: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      });
    }
  },

  logout: () => {
    clearSession();
    showToast.success("Cierre de sesión exitoso");
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
      console.error("Error al registrar:", error);
      showToast.error(
        error?.response?.data?.message || "Error al registrar usuario"
      );
      return false;
    }
  },
}));
