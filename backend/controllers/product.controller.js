import { redis } from "../lib/redis.js";
import Product from "../model/product.model.js";
import cloudinary from "../lib/cloudinary.js";

const updateFeaturedProductsInRedis = async () => {
  //   console.log(updatedProduct);
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await redis.set("featured_products", JSON.stringify(featuredProducts));
  } catch (error) {
    console.log(
      `Error while updating featured products in redis: ${error.message}`
    );
    return res
      .status(500)
      .json({ message: `Internal Server Error : ${error.message}` });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ products });
  } catch (error) {
    console.log(`Error in getAllProducts controller : ${error.message}`);
    res
      .status(500)
      .json({ message: `Internal Server Error : ${error.message}` });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.status(200).json(JSON.parse(featuredProducts));
    }

    featuredProducts = Product.find({ isFeatured: true }).lean();
    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured Products found" });
    }
    // store featured products in redis
    await redis.set("featured_products", JSON.stringify(featuredProducts));
    return res.status(200).json(featuredProducts);
  } catch (error) {
    console.log(`Error in getFeaturedProducts controller : ${error.message}`);
    return res
      .status(500)
      .json({ message: `Internal Server Error : ${error.message}` });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    let cloudinaryResponse = null;
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "Products",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
      category,
    });

    return res.status(201).json(product);
  } catch (error) {
    console.log(`Error in createProduct conroller : ${error.message}`);
    return res
      .status(500)
      .json({ message: `Internal Server Error : ${error.message}` });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const productToBeDeleted = await Product.findById(productId);

    if (!productToBeDeleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (productToBeDeleted.image) {
      // Example secure_url - "https://res.cloudinary.com/your-cloud-name/image/upload/v1694271000/sample_image.jpg"
      // Here sample_image is the public if

      const publicId = productToBeDeleted.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("Image deleted from cloudinary");
      } catch (error) {
        console.log("Error deleting image from cloudinary");
      }
    }
    await Product.findByIdAndDelete(productId);
    await updateFeaturedProductsInRedis();
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(`Error in deleteProductcontroller ${error.message}`);
    return res
      .status(500)
      .json({ message: `Internal Server Error : ${error.message}` });
  }
};

export const getRecommendedProducts = async (req, res) => {
  try {
    const randomProducts = await Product.aggregate([
      { $sample: { size: 3 } },
      { $project: { _id: 1, name: 1, description: 1, image: 1, price: 1 } },
    ]);
    res.status(200).json(randomProducts);
  } catch (error) {
    console.log(
      `Error in getRecommendedProducts controller : ${error.message}`
    );
    res
      .status(500)
      .json({ message: `Internal Server Error : ${error.message}` });
  }
};

export const getProductsByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const productsByCategory = await Product.find({ category });
    res.status(200).json(productsByCategory);
  } catch (error) {
    console.log(`Error in getProductsByCategory controller : ${error.message}`);
    res
      .status(500)
      .json({ message: `Internal Server Error : ${error.message}` });
  }
};

export const toggleFeaturedFlag = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      await updateFeaturedProductsInRedis();
      return res.status(200).json(updatedProduct);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(`Error in toggleFeaturedFlag controller : ${error.message}`);
    return res
      .status(500)
      .json({ message: `Internal Server Error : ${error.message}` });
  }
};
