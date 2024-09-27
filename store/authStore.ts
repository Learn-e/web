import { api } from "@/api/api";
import { create } from "zustand";

interface AuthStore {
  isLoggedIn: boolean;
  user: any;
  getUser: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  user: null,
  getUser: async () => {
    try {
      const user = await api.get("auth").json();
      set({
        isLoggedIn: true,
        user: user,
      });
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  },
  logout: () => {
    try {
      api.delete("auth").json();
    } catch (error) {
      console.error("Failed to logout", error);
    }
    set({
      isLoggedIn: false,
      user: null,
    });
  },
}));

useAuthStore.getState().getUser();