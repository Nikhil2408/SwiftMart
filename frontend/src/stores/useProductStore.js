import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const userProductStore = create((set) => {
  return {
    products: [],
    loading: false,
    createProduct: async (productData) => {
      set({ loading: true });
      try {
        const productCreated = await axiosInstance.post(
          "/products/createProduct",
          productData
        );
        set((prevState) => {
          return {
            products: [...prevState.products, productCreated.data],
            loading: false,
          };
        });
        toast.success("Product created Successfully");
      } catch (error) {
        toast.error("Failed to create product, please try again!");
        console.log(error);
        set({ loading: false });
      }
    },
  };
});

export default userProductStore;
