import { messagesService } from "../services/index.js";
import moment from "moment";
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
    },
    date: moment().format()
  };
  try {
    const response = await messagesService.saveMessage(data);
    //logger.info(`Method: ${req.method} Url: ${req.url}`)
    res.status(200).json({id: response._id});
  } catch (error) {
    //logger.error(error.message)
    res.status(400).send(error.message);
  }
}
export async function getMessages(req, res) {
  try {
    const products = await messagesService.getMessages(req.params.id);
    //logger.info(`Method: ${req.method} Url: ${req.url}`)
    res.status(200).json( products );
  } catch (error) {
    //logger.error(error.message)
    res.status(400).send(error.message);
  }
}