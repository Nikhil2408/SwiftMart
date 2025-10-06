import React, { useState } from "react";
import { motion } from "framer-motion";

const CreateProduct = () => {
  const [createProductData, setCreateProductData] = useState({});
  function changeHandler() {}
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="rounded-xl flex flex-col bg-gray-900 py-8 px-6 mt-6 w-2/3 lg:w-1/3"
      >
        {/* Product name input field */}
        <label className="font-bold" htmlFor="productName">
          Product Name
        </label>
        <div>
          <input
            id="productName"
            className="bg-gray-600 py-2 pl-9 pr-4 rounded-lg mt-2 mb-1 outline-none w-full"
            type="text"
            name="productName"
            placeholder="Enter the product name"
            // onChange={changeHandler}
            // value={loginData.email}
          />
          {/* <p className="text-red-500 mb-4">{errors && errors.email}</p> */}
        </div>

        {/* Description text area field */}
        <label className="font-bold" htmlFor="description">
          Description
        </label>
        <div>
          <textarea
            id="description"
            className="bg-gray-600 py-2 pl-9 pr-4 rounded-lg mt-2 mb-1 outline-none w-full"
            name="description"
            placeholder="Enter product description"
            onChange={changeHandler}
            value={createProductData.password}
          />
          {/* <p className="text-red-500 mb-4">{errors && errors.password}</p> */}
        </div>

        {/* Price input field */}
        <label className="font-bold" htmlFor="price">
          Price
        </label>
        <div>
          <input
            id="price"
            className="bg-gray-600 py-2 pl-9 pr-4 rounded-lg mt-2 mb-1 outline-none w-full"
            type="number"
            name="price"
            placeholder="Enter product price"
            // onChange={changeHandler}
            // value={loginData.email}
          />
          {/* <p className="text-red-500 mb-4">{errors && errors.email}</p> */}
        </div>
      </motion.div>
    </>
  );
};

export default CreateProduct;
