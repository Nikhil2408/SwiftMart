import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import userProductStore from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const { category } = useParams();
  const { products, getProductsByCategory, loading } = userProductStore();
  const pageTitle = `${category.charAt(0).toUpperCase()}${category.slice(1)}`;

  useEffect(() => {
    getProductsByCategory(category);
  }, [category, getProductsByCategory]);

  return (
    <>
      {loading ? (
        <>
          <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
            <LoaderCircle
              size={120}
              className="animate-spin text-emerald-400"
            />
          </div>
        </>
      ) : (
        <>
          <div className=" flex flex-col">
            <p className="self-center text-3xl text-emerald-500 font-bold">
              {pageTitle}
            </p>
            {products.length === 0 && (
              <p className="self-center font-semibold text-xl mt-4">
                No Products found!!
              </p>
            )}
            <div className="flex gap-10 justify-center">
              {products.map((product) => {
                return <ProductCard product={product} />;
              })}
            </div>
          </div>
          <Toaster />
        </>
      )}
    </>
  );
};

export default CategoryPage;
