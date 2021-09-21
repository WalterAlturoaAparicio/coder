import express from "express";
import { productController } from "../controllers/index.js";
const router = new express.Router();

router.get("/", productController.getProducts);
router.post("/", productController.saveProduct);
router.delete("/:id", productController.deleteProduct);
router.patch("/:id", productController.updateProduct);

export { router };
