import { messagesService } from "../services/index.js";

export async function saveMessage(req, res) {
  const { body } = req;
  const data = {
    text: body.text,
    author: {
        id: body.author.id,
        nombre: body.author.nombre,
        apellido: body.author.apellido,
        edad: body.author.edad,
        alias: body.author.alias,
        avatar: body.author.avatar,
    }
  };
  try {
    const response = await messagesService.saveMessage(data);
    res.status(200).json({id: response._id});
  } catch (error) {
    res.status(400).send(error.message);
  }
}
export async function getMessages(req, res) {
  try {
    const products = await messagesService.getMessages(req.params.id);
    res.status(200).json( products );
  } catch (error) {
    res.status(400).send(error.message);
  }
}