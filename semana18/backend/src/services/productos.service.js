import { productModel } from "../models/index.js";

export async function saveProduct(data) {
  try {
    const exist = await productModel.default.findOne({ title: data.title });
    if (exist) {
      throw new Error(`Product ${data.title} already exists`);
    }
    const response = await productModel.default.create(data);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
export async function getProducts(id) {
	try {
    if (id) {
      const product = await productModel.default.findOne({_id: id})
      if (!product) {
        throw new Error('Product not found');
      }
      return product
    } else {
      const products = await productModel.default.find({})
      if (!products) {
        throw new Error('Products not found')
      }
      return products
    }
		
	} catch (error) {
		throw new Error(error)
	}
}
export async function updateProduct(data) {
    try {
        const exist = await productModel.default.findOne({ _id: data.id });
        if (!exist) {
            throw new Error(`Product not found`);
        }
        const response = await productModel.default.updateOne({_id: data.id}, data)
        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function deleteProduct(id) {
    try {
        const exist = await productModel.default.findOne({ _id: id });
        if (!exist) {
            throw new Error(`Product not found`);
        }
        await productModel.default.deleteOne({_id: id})
        return exist
    } catch (error) {
        throw new Error(error)
    }
}