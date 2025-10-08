import React, { useEffect } from "react";
import userProductStore from "../stores/useProductStore";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { LoaderCircle, Star, Trash } from "lucide-react";

const DisplayProducts = () => {
  const { getProducts, deleteProduct, toggleFeaturedFlag, products, loading } =
    userProductStore();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
          <LoaderCircle size={120} className="animate-spin text-emerald-400" />
        </div>
      ) : (
        <motion.div
          className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto my-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <table className=" min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Category
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Featured
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {products?.map((product) => (
                <tr key={product._id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={product.image}
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">
                          {product.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      ${product.price.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      {product.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleFeaturedFlag(product._id)}
                      className={`p-1 rounded-full ${
                        product.isFeatured
                          ? "bg-yellow-400 text-gray-900"
                          : "bg-gray-600 text-gray-300"
                      } hover:bg-yellow-500 hover:cursor-pointer transition-colors duration-200`}
                    >
                      <Star size={18} />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="text-red-400 hover:text-red-300 hover:cursor-pointer"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="flex justify-center mx-2 my-4 font-semibold">
              No Products found!!
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};

export default DisplayProducts;
