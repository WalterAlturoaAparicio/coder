import { productService } from "../services/index.js";
import moment from "moment";

export async function saveProduct(req, res) {
  const { body } = req;
  const fecha = moment().format();
  const data = {
    title: body.title,
    price: body.price,
    thumbnail: body.thumbnail,
    date: fecha,
    stock: body.stock,
    description: body.description,
    code: body.code,
  };
  try {
    const response = await productService.saveProduct(data);
    res.status(200).json({ result: response });
  } catch (error) {
    res.status(400).send(error.message);
  }
}
export async function getProducts(req, res) {
  try {
    const products = await productService.getProducts(req.params.id);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).send(error.message);
  }
}
export async function updateProduct(req, res) {
  const { body } = req;
  const fecha = moment().format();
  const data = {
    title: body.title,
    price: body.price,
    thumbnail: body.thumbnail,
    date: fecha,
    stock: body.stock,
    description: body.description,
    code: body.code,
  };
  try {
    const product = await productService.updateProduct(req.params.id, data);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
export async function deleteProduct(req, res) {
  try {
    const product = await productService.deleteProduct(req.params.id);
    res.status(200).json({
      result: "ok",
      productDeleted: product,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
}
