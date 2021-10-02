import { mensajesModel } from "../DB/models/index.js";
import pkg from "normalizr";
const { normalize, schema } = pkg;
// import util from "util";

// function print(objeto) {
//   console.log(util.inspect(objeto, false, 12, true));
// }

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
    const messages = await mensajesModel.default.find({});
    if (!messages) {
      throw new Error("Products not found");
    }
    //console.log();
    const user = new schema.Entity("users");

    const comment = new schema.Entity("comments", {
      commenter: user,
    });
    const article = new schema.Entity('articles', {
      comments: [comment]
    });
    const data = {
      id: 'mensajes',
      messages
    }
    const dataNormalize = normalize(data, article);
    const dataBits = JSON.stringify(data).length;
    return {dataNormalize, dataBits};
  } catch (error) {
    throw new Error(error);
  }
}
