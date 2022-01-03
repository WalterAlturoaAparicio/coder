import UsersDaoFactory from "../persistence/userFactory.js";

export async function createUser(data) {
  try {
    const dao = UsersDaoFactory.getDao();
    const response = await dao.save(data);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
export async function getUser(username) {
  try {
    const dao = UsersDaoFactory.getDao();
    const user = await dao.getByName(username);
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
        UserModel.default.findById(id);
    } catch (error) {
        throw new Error(error);
    }
}
