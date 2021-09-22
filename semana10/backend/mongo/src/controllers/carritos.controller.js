import { carritoService } from "../services/index.js";
import moment from "moment";

export async function createCarrito(req, res) {
  const { body } = req;
  const fecha = moment().format();
  const data = {
    date: fecha,
    products: body.products,
  };
  try {
    const response = await carritoService.createCarrito(data);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
export async function deleteCarrito(req, res) {
  try {
    const carrito = await carritoService.deleteCarrito(req.params.id);
    res.status(200).json({
      result: "ok",
      carritoDeleted: carrito,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
}
export async function getProductsCarritoById(req, res) {
  try {
    const products = await carritoService.getProductsCarritoById(req.params.id);
    res.status(200).json({products})
  } catch (error) {
    res.status(400).send(error.message);
  }
}
export async function getCarritos(req, res) {
  try {
    const carritos = await carritoService.getCarritos();
    res.status(200).json({carritos})
  } catch (error) {
    res.status(404).send(error.message);
  }
}