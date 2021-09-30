import { mensajesModel } from "../DB/models/index.js";
import { normalize, schema } from "normalizr";
import util from "util";

function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true));
}

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
    const author = new schema.Entity("author");

    const mensajes = new schema.Entity("mensajes", {
      author,
    });
    const all = new schema.Entity("all", {
      _id: 'mensajes',
      mensajes: [mensajes],
    });
    const dataNormalize = normalize(messages, all);
    print(dataNormalize);
    return dataNormalize;
  } catch (error) {
    throw new Error(error);
  }
}
