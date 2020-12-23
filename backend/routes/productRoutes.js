import express from "express";
const router = express.Router();
import {
  deleteProduct,
  getProducts,
  getProductById,
} from "../controllers/productController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct);

export default router;
