import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const useCartStore = create((set) => {
  return {
    loading: false,
    cartItems: [],
    addToCart: async (productId) => {
      set({ loading: true });
      try {
        const userCartItems = await axiosInstance.post("/cart", { productId });
        set({ loading: false, cartItems: userCartItems.data });
      } catch (error) {
        console.log(error);
        toast.error("Error while adding item to cart");
      }
    },
  };
});

export default useCartStore;
