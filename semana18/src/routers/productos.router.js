import express from "express";
import { productController } from "../controllers/index.js";
const router = new express.Router();

router.get("/:id?", productController.getProducts);
router.post("/", productController.saveProduct);
router.delete("/:id", productController.deleteProduct);
router.put("/:id", productController.updateProduct);

export { router };
