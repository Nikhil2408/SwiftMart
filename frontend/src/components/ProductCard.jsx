import React from "react";
import { Loader, ShoppingCart } from "lucide-react";
import { Toaster } from "react-hot-toast";
import useCartStore from "../stores/useCartStore";

const ProductCard = ({ product }) => {
  const { _id, name, price, image } = product;
  const { addToCart, loading } = useCartStore();

  function handleAddToCart(productId) {
    addToCart(productId);
  }

  return (
    <div className="border border-gray-300 rounded-md p-3 mt-6">
      <img
        src={image}
        alt={name}
        className="h-48 w-48 rounded-lg object-cover mb-2"
      />
      <p className="font-semibold text-md mb-2">{name}</p>
      <p className="text-emerald-500 text-lg font-bold mb-2">${price}</p>
      <button className="flex gap-1 items-center py-1 px-2 bg-emerald-500 rounded-md mb-2 cursor-pointer">
        {loading ? (
          <>
            <Loader className="animate-spin" size={20} />
            <span>Adding...</span>
          </>
        ) : (
          <>
            <ShoppingCart size={18} />
            <span onClick={() => handleAddToCart(_id)}>Add to cart</span>
          </>
        )}
      </button>

      <Toaster />
    </div>
  );
};

export default ProductCard;
