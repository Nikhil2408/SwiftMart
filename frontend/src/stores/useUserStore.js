import axiosInstance from "../lib/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";

const useUserStore = create((set) => {
  return {
    user: null,
    loading: false,
    checkingAuth: true,

    signup: async ({ fullName, email, password, confirmPassword }) => {
      toast.dismiss();
      set({ loading: true });
      if (password !== confirmPassword) {
        set({ loading: false });
        toast.error("Passwords do not match");
      }
      try {
        const response = await axiosInstance.post("/auth/signup", {
          name: fullName,
          email,
          password,
        });
        set({ user: response.data.user, loading: false });
        toast.success(response.message);
      } catch (error) {
        set({ loading: false });
        toast.error(error.response.data.message || "An Error Occured!!");
      }
    },
    login: async ({ email, password }) => {
      set({ loading: true });
      try {
        const response = await axiosInstance.post("/auth/login", {
          email,
          password,
        });
        set({ user: response.data, loading: false });
      } catch (error) {
        set({ loading: false });
        return toast.error(error.response.data.message || "An Error Occured!!");
      }
    },
    logout: async () => {
      set({ loading: true });
      try {
        await axiosInstance.post("/auth/logout");
        set({ loading: false, user: null });
      } catch (error) {
        set({ loading: false });
        toast.error(
          error.response.data.message || "An error occured during logout"
        );
      }
    },
    checkAuth: async () => {
      set({ checkingAuth: true });
      try {
        const loggedInProfile = await axiosInstance.get("/auth/profile");
        set({ user: loggedInProfile.data, checkingAuth: false });
      } catch (e) {
        console.log(e);
        set({ checkingAuth: false, user: null });
      }
    },
  };
});

export default useUserStore;

// TODO: Implement the axios interceptors for refreshing the access token
