import db from "../DB/db.js";
import { productService } from "./index.js";

export async function createCarrito(data) {
  try {
    const response = await db("carritos").insert(data);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
export async function getCarritos() {
  try {
    const carritos = await db("carritos").select();
    return carritos;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteCarrito(id) {
  try {
    const response = await db("carritos").del().where("id", id);
    if (!response) {
      throw new Error("Carrito not found");
    }
    await db("producto_carrito").del().where("carrito_id", id);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function saveProductCarrito(data) {
  try {
    const exist = await productService.getProducts(data.product_id);
    if (exist.length === 0) {
      throw new Error("Product not found")
    }
    const producto = await db("producto_carrito").select().where("product_id", data.product_id).andWhere("carrito_id", data.carrito_id);
    if (producto.length !== 0){
      throw new Error("Product is already in cart")
    }
    const response = await db("producto_carrito").insert(data);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
export async function deleteProductCarrito(id, id_prod) {
  try {
    const carrito = await db("carritos").select().where("id", id);
    if (carrito.length === 0){
      throw new Error("Carrito not found");
    }
    const producto = await db("producto_carrito").select().where("product_id", id_prod).andWhere("carrito_id", id);
    if(producto.length === 0) {
      throw new Error("Product not found in cart");
    }
    await db("producto_carrito").del().where("carrito_id", id).andWhere("product_id", id_prod);
    return;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getProductsCarritoById(id) {
  try {
    const response = await db("carritos").select().where("id", id);
    if (response.length === 0) {
      throw new Error("Carrito not found");
    }
    const productsId = await db("producto_carrito").select("product_id").where("carrito_id", id);
    const products = []
    // eslint-disable-next-line no-undef
    await Promise.all(
      productsId.map(async (prod) =>{
        const product = await productService.getProducts(prod.product_id);
        products.push(product);
      })
    )
    return products;
  } catch (error) {
    throw new Error(error);
  }
}