import db from "../DB/db.js";
import { productService } from "./index.js";

const query = db.collection("carritos");

export async function createCarrito(data) {
  try {
    await query.doc().create(data);
    return "ok";
  } catch (error) {
    throw new Error(error);
  }
}
export async function deleteCarrito(id) {
  try {
    const exist = (await query.doc(id).get()).data();
    if (!exist) {
      throw new Error("Carrito not found");
    }
    await query.doc(`${id}`).delete();
    return exist;
  } catch (error) {
    throw new Error(error);
  }
}
export async function getCarritos() {
  try {
    let response = await query.get();
    response = response.docs.map((product) => {
      return {
        id: product.id,
        products: product.data().products,
      };
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
export async function getProductsCarritoById(id) {
  try {
    const carrito = (await query.doc(id).get()).data();
    if (!carrito) {
      throw new Error("Carrito not found");
    }
    if (carrito.products.length === 0) {
      throw new Error("There are no products in cart yet.");
    }
    const products = [];
    // eslint-disable-next-line no-undef
    await Promise.all(
      carrito.products.map(async (idProduct) => {
        console.log(idProduct);
        const product = await productService.getProducts(idProduct);
        products.push(product);
      })
    );
    return products;
  } catch (error) {
    return [];
  }
}
export async function saveProductCarrito(id, id_prod) {
  try {
    const products = await getProductsCarritoById(id);
    console.log(products);
    products.map((prod) => {
      if (prod === id_prod)
        throw new Error("Product is already in cart");
    });
    const product = await productService.getProducts(id_prod);
    products.push(product.id);
    
    await query.doc(id).update({products});
    const response = (await query.doc(id).get()).data();

    return response;
  } catch (error) {
    throw new Error(error);
  }
}
export async function deleteProductCarrito(id, id_prod) {
  let exist = false;
  try {
    const existCarrito = (await query.doc(id).get()).data();
    if (!existCarrito) {
      throw new Error("Carrito not found");
    }
    const productsOld = await getProductsCarritoById(id);
    const productsUpdate = productsOld.filter((prod) => {
      if (prod.id === id_prod) exist = true;
      return prod.id !== id_prod;
    });
    const products = productsUpdate.map((prod)=>prod.id);
    if (!exist) throw new Error("Product not found in cart");
    await query.doc(id).update({products});

    const response = (await query.doc(id).get()).data();

    return response;
  } catch (error) {
    throw new Error(error);
  }
}
