import db from "../DB/db.js";

export async function saveProduct(data) {
  try {
    const response = await db("productos").insert(data);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
export async function getProducts(id) {
  try {
    if (id) {
      const product = await db("productos").select().where("id", id);
      return product;
    } else {
      const products = await db("productos").select();
      return products;
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteProduct(id) {
  try {
    const response = await db("productos").del().where("id", id);
    if (!response) {
      throw new Error("Product not found");
    }
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
export async function updateProduct(id, data) {
  try {
    const exist = await getProducts(id);
    //console.log(exist);
    if (!exist) {
      throw new Error("Product not found");
    }
    await db("productos").update(data).where("id", id);
    const response = await getProducts(id);
    console.log(response);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
