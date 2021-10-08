import express from "express";
import ProductTestController from "../controllers/products-test.controller.js";

export default class ProductTestRoute extends express.Router {
  constructor() {
    super();
    this.productController = new ProductTestController();

    this.post("/popular", this.productController.createProducts);
    this.get("/:id?", this.productController.getProducts);
    this.post("/", this.productController.addProduct);
  }
}
