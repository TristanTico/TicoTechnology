import { create } from "zustand";
import { getAllUsersRequest, createUser } from "@/api/user.api";
import { UserState } from "@/types/types";
import { showToast } from "@/lib/showToast";

export const useUserStore = create<UserState>((set) => ({
  users: [],
  isLoading: false,
  error: null,
  page: 1,
  limit: 5,
  totalPages: 1,
  fetchUsers: async ({ page, limit }) => {
    set({ isLoading: true, error: null });
    try {
      const res = await getAllUsersRequest({ page, limit });
      setTimeout(() => {
        set({
          users: res.data.data,
          page: res.data.page,
          limit: res.data.limit,
          totalPages: res.data.totalPages,
          isLoading: false,
        });
      }, 1000);
      console.log(res.data.data);
      return res.data.data;
    } catch (error: any) {
      console.log(error);

      set({
        error: error.response?.data?.message || "Error al obtener usuarios",
        isLoading: false,
      });
    }
  },
  createUser: async (user) => {
    try {
      const res = await createUser(user);
      showToast.success(res.data.message);
      const { fetchUsers, page, limit } = useUserStore.getState();
      await fetchUsers({ page, limit });
      return true;
    } catch (error : any) {
      showToast.error(error?.response?.data?.message || "Error al registrar usuario");
      console.log(error);
      
      return false;
    }
  },
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
}));
