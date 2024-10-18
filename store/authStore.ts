import { api } from "@/api/api";
import { Auth } from "@/api/auth";
import { toast } from "sonner";
import { create } from "zustand";

interface AuthStore {
  isLoggedIn: boolean;
  user: any;
  isLoading: boolean;
  getUser: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  user: null,
  isLoading: true,

  getUser: async () => {
    const auth = new Auth();
    set({ isLoading: true });
    try {
      const user = await auth.identity();
      set({
        isLoggedIn: true,
        user: user,
      });
    } catch (error) {
      console.error("Failed to fetch user data", error);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({ isLoading: true });
    try {
      api.delete("auth").json();
      toast.success("Vous êtes déconnecté", {
        position: "top-center",
        duration: 1500,
      });
    } catch (error) {
      console.error("Failed to logout", error);
      toast.error("Erreur lors de la déconnexion", {
        position: "top-center",
        duration: 1500,
      });
    } finally {
      set({
        isLoggedIn: false,
        user: null,
        isLoading: false,
      });
    }
  },
}));

useAuthStore.getState().getUser();
