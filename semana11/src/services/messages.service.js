import { mensajesModel } from "../DB/models/index.js";

export async function saveMessage(data) {
  try {
    const response = await mensajesModel.default.create(data);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
export async function getMessages() {
	try {
      const products = await mensajesModel.default.find({})
      if (!products) {
        throw new Error('Products not found')
      }
      return products
    
		
	} catch (error) {
		throw new Error(error)
	}
}