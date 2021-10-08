import express from "express";
import { productsController } from "../controllers/index.js";

const router = new express.Router();

router.get("/", productsController.getProducts);
router.post("/", productsController.saveProduct);
router.delete("/:id", productsController.deleteProduct);
router.put("/:id", productsController.updateProduct);

export { router };
