import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getRecommendedProducts,
  toggleFeaturedFlag,
} from "../controllers/product.controller.js";
import { isAdminRoute, protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, isAdminRoute, getAllProducts);
router.get("/featuredProducts", getFeaturedProducts);
router.get("/recommendedProducts", getRecommendedProducts);
router.get("/:category", getProductsByCategory);
router.post("/createProduct", protectRoute, isAdminRoute, createProduct);
router.patch(
  "/toggleFeaturedFlag/:productId",
  protectRoute,
  isAdminRoute,
  toggleFeaturedFlag
);
router.delete("/:productId", protectRoute, isAdminRoute, deleteProduct);

export default router;
