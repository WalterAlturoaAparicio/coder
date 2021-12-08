import { userModel } from "../models/index.js";

export async function createUser(data) {
  try {
    const response = await userModel.default.create(data);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
export async function getUser(username) {
  try {
    const user = await userModel.default.findOne({username});
    if (!user) {
      throw new Error("User not found");
    }
    return user;
    
  } catch (error) {
    throw new Error(error);
  } 
}
export async function getById(id) {
    try {
        userModel.default.findById(id);
    } catch (error) {
        throw new Error(error);
    }
}
