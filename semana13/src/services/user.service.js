import { UserModel } from "../DB/models/index.js";

export async function createUser(data) {
  try {
    const response = await UserModel.default.create(data);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
export async function getUser(username) {
  try {
    const user = await UserModel.default.findOne({username});
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
        UserModel.findById(id);
    } catch (error) {
        throw new Error(error);
    }
}
