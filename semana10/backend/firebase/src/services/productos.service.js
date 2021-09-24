import db from "../DB/db.js";

const query = db.collection("productos");

export async function saveProduct(data) {
  try {
    await query.doc().create(data);
    return "ok";
  } catch (error) {
    throw new Error(error);
  }
}
export async function getProducts(id) {
  try {
    if (id) {
      const doc = query.doc(`${id}`);
      const product = await doc.get();
      if (!product) {
        throw new Error("Product not found");
      }
      return {
        id: product.id,
        title: product.data().title,
        date: product.data().date,
        description: product.data().description,
        code: product.data().code,
        price: product.data().price,
        thumbnail: product.data().thumbnail,
        stock: product.data().stock,
      };
    } else {
      let response = await query.get();
      response = response.docs.map((product) => {
        return {
          id: product.id,
          title: product.data().title,
          date: product.data().date,
          description: product.data().description,
          code: product.data().code,
          price: product.data().price,
          thumbnail: product.data().thumbnail,
          stock: product.data().stock,
        };
      });
      if (response.length === 0) {
        throw new Error("Products not found");
      }
      return response;
    }
  } catch (error) {
    throw new Error(error);
  }
}
export async function updateProduct(id, data) {
  try {
    const exist = (await query.doc(`${id}`).get()).data();
    if (!exist) {
      throw new Error("Product not found");
    }
    await query.doc(id).update(data);
    const response = (await query.doc(`${id}`).get()).data();
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
export async function deleteProduct(id) {
  try {
    const exist = (await query.doc(`${id}`).get()).data();
    if (!exist) {
      throw new Error("Product not found");
    }
    await query.doc(`${id}`).delete();
    return exist;
  } catch (error) {
    throw new Error(error);
  }
}
