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
        await axiosInstance.post("/products/createProduct", productData);
        set({ loading: false });
        toast.success("Product created Successfully");
      } catch (error) {
        toast.error("Failed to create product, please try again!");
        console.log(error);
        set({ loading: false });
      }
    },
    getProducts: async () => {
      set({ loading: true });
      try {
        const fetchedProducts = await axiosInstance.get("/products");
        set({ products: fetchedProducts.data.products, loading: false });
      } catch (error) {
        set({ loading: false });
        toast.error("Error while fetching products");
        console.log(error);
      }
    },
    deleteProduct: async (productId) => {
      set({ loading: true });
      try {
        await axiosInstance.delete(`/products/${productId}`);
        set((prevState) => {
          const updatedProducts = prevState.products.filter((product) => {
            return product._id !== productId;
          });
          return { loading: false, products: updatedProducts };
        });
      } catch (error) {
        set({ loading: false });
        console.log(error);
        toast.error("Error while deleting product");
      }
    },
    toggleFeaturedFlag: async (productId) => {
      set({ loading: true });
      try {
        const response = await axiosInstance.patch(
          `/products/toggleFeaturedFlag/${productId}`
        );

        set((prevState) => {
          const updatedProducts = prevState.products.map((product) => {
            return product._id === productId ? { ...response.data } : product;
          });
          return { products: updatedProducts, loading: false };
        });
      } catch (error) {
        console.log(error);
        toast.error("Error while updating featured flag for the product");
      }
    },
    getProductsByCategory: async (category) => {
      set({ loading: true });
      try {
        const response = await axiosInstance.get(`/products/${category}`);
        set({ loading: false, products: response.data });
      } catch (error) {
        console.log(error);
        toast.error("Error while fetching products by category");
      }
    },
  };
});

export default userProductStore;
