import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  addToCart,
  getCart,
  removeAllFromCart,
  updateQuantity,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", protectRoute, getCart);
router.post("/", protectRoute, addToCart);
router.delete("/", protectRoute, removeAllFromCart);
router.put("/:productId", protectRoute, updateQuantity);

export default router;
