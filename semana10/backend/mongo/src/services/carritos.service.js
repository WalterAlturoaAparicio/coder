import mongoose from "mongoose";
import { carritoModel } from "../models/index.js";
import { productService } from "./index.js";

export async function createCarrito(data) {
  try {
    const response = await carritoModel.default.create(data);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
export async function deleteCarrito(id) {
  try {
    const exist = await carritoModel.default.findOne({ _id: id });
    if (!exist) {
      throw new Error(`Carrito not found`);
    }
    await carritoModel.default.deleteOne({ _id: id });
    return exist;
  } catch (error) {
    throw new Error(error);
  }
}
export async function getCarritos() {
  try {
    const carritos = await carritoModel.default.find({});
    if (!carritos) {
      throw new Error("Products not found");
    }
    return carritos;
  } catch (error) {
    throw new Error(error);
  }
}
export async function getProductsCarritoById(id) {
  try {
    const productsId = await carritoModel.default.findOne({ _id: id });
    if (productsId.products.length === 0) {
      throw new Error("There are no products in the cart yet.");
    }
    const products = [];
    // eslint-disable-next-line no-undef
    await Promise.all(
      productsId.products.map(async (idProduct) => {
        const product = await productService.getProducts(
          mongoose.Types.ObjectId(idProduct)
        );
        products.push(product);
      })
    );
    return products;
  } catch (error) {
    throw new Error(error);
  }
}
