import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Upload, PlusCircle, Loader } from "lucide-react";
import userProductStore from "../stores/useProductStore";
import { Toaster } from "react-hot-toast";

const categories = [
  { internalName: "", displayName: "Select a category" },
  { internalName: "jeans", displayName: "Jeans" },
  { internalName: "tshirts", displayName: "T-Shirt" },
  { internalName: "shoes", displayName: "Shoe" },
  { internalName: "glasses", displayName: "Glasses" },
  { internalName: "jackets", displayName: "Jacket" },
  { internalName: "suits", displayName: "Suit" },
  { internalName: "bags", displayName: "Bag" },
];

const createProductInitialData = {
  name: "",
  description: "",
  price: "",
  category: "",
  image: "",
};

const CreateProduct = () => {
  const [createProductData, setCreateProductData] = useState(
    createProductInitialData
  );
  const [errors, setErrors] = useState({});

  const { createProduct, loading } = userProductStore();

  function changeHandler(e) {
    setCreateProductData((currentState) => {
      return { ...currentState, [e.target.name]: e.target.value };
    });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setCreateProductData((currentState) => {
        return { ...currentState, [e.target.name]: reader.result };
      });
      setErrors({ ...errors, [e.target.name]: "" });
    };
    reader.readAsDataURL(file);
  }

  function checkValidations() {
    const errorObj = {};
    Object.keys(createProductData).forEach((field) => {
      if (!createProductData[field]) {
        errorObj[field] = `Required`;
      }
    });
    setErrors(errorObj);
    return Object.keys(errorObj).length === 0;
  }

  async function handleCreateProduct() {
    const isValid = checkValidations();
    if (isValid) {
      try {
        await createProduct(createProductData);
        setCreateProductData(createProductInitialData);
      } catch (error) {
        console.log("Error while creating product", error);
      }
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="rounded-xl flex flex-col bg-gray-900 py-8 px-6 mt-6 w-2/3 lg:w-1/3"
      >
        <h2 className="mb-4 text-emerald-500 font-bold text-xl">
          Create New Product
        </h2>
        {/* Product name input field */}
        <label className="font-bold" htmlFor="name">
          Product Name
        </label>
        <div>
          <input
            id="name"
            className="bg-gray-600 py-2 px-2 rounded-lg mt-2 mb-1 outline-none w-full"
            type="text"
            name="name"
            placeholder="Enter the product name"
            onChange={changeHandler}
            value={createProductData.name}
          />
          <p className="text-red-500 mb-4">{errors && errors.name}</p>
        </div>

        {/* Description text area field */}
        <label className="font-bold" htmlFor="description">
          Description
        </label>
        <div>
          <textarea
            id="description"
            className="bg-gray-600 py-2 px-2 rounded-lg mt-2 mb-1 outline-none w-full"
            name="description"
            placeholder="Enter product description"
            onChange={changeHandler}
            value={createProductData.description}
          />
          <p className="text-red-500 mb-2">{errors && errors.description}</p>
        </div>

        {/* Price input field */}
        <label className="font-bold" htmlFor="price">
          Price
        </label>
        <div>
          <input
            id="price"
            className="bg-gray-600 py-2 px-2 rounded-lg mt-2 mb-1 outline-none w-full"
            type="number"
            name="price"
            step="0.01"
            placeholder="Enter product price"
            onChange={changeHandler}
            value={createProductData.price}
          />
          <p className="text-red-500 mb-4">{errors && errors.price}</p>
        </div>

        {/* Category dropdown field */}
        <label className="font-bold" htmlFor="category">
          Category
        </label>
        <div>
          <select
            name="category"
            id="category"
            className="bg-gray-600 py-2 px-2 rounded-lg mt-2 mb-1 outline-none w-full"
            value={createProductData.category}
            onChange={changeHandler}
          >
            {categories.map((category) => {
              return (
                <option
                  key={category.internalName}
                  value={category.internalName}
                >
                  {category.displayName}
                </option>
              );
            })}
          </select>
          <p className="text-red-500 mb-4">{errors && errors.category}</p>
        </div>

        <div>
          <input
            name="image"
            type="file"
            id="image"
            accept="image/*"
            className="sr-only"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className="flex items-center gap-2 justify-center bg-gray-600 p-2 rounded-lg w-fit"
          >
            <Upload size={18} />
            <span>Upload Image</span>
          </label>
          {createProductData.image && (
            <div className="text-md mt-2 text-gray-300">
              Image Loaded Successfully!!
            </div>
          )}
          <p className="text-red-500 mb-4">{errors && errors.image}</p>
        </div>

        <button
          className="flex gap-2 items-center justify-center bg-emerald-500 p-2 rounded-lg mt-6 mb-1 w-full"
          onClick={handleCreateProduct}
        >
          {loading ? (
            <>
              <Loader className="animate-spin" size={18} />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <PlusCircle size={18} />
              <span>Create Product</span>
            </>
          )}
        </button>
      </motion.div>
      <Toaster />
    </>
  );
};

export default CreateProduct;
