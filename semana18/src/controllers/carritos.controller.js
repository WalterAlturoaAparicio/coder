import { carritoService } from "../services/index.js";
import moment from "moment";

export async function createCarrito(req, res) {
  const { body } = req;
  const fecha = moment().format();
  const data = {
    date: fecha,
    products: body.products,
    user: body.user
  };
  try {
    const response = await carritoService.createCarrito(data);
    res.status(200).json({id: response._id});
  } catch (error) {
    res.status(400).send({error: error.message});
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
    res.status(400).send({error: error.message});
  }
}
export async function getProductsCarritoById(req, res) {
  try {
    const products = await carritoService.getProductsCarritoById(req.params.id);
    res.status(200).json(products)
  } catch (error) {
    res.status(400).send({error: error.message});
  }
}
export async function getCarrito(req, res) {
  try {
    //console.log(req.user);
    const carrito = await carritoService.getCarrito(req.user);
    res.status(200).json(carrito)
  } catch (error) {
    res.status(404).send({error: error.message});
  }
}
export async function saveProductCarrito(req, res) {
  try {
    const { body } = req;
    //console.log(body);
    const carrito = await carritoService.saveProductCarrito(req.params.id, body._id);
    res.status(200).json(carrito);

  } catch (error) {
    res.status(400).send({error: error.message})
  }
}
export async function deleteProductCarrito(req, res) {
  try {
    const carrito = await carritoService.deleteProductCarrito(req.params.id, req.params.id_prod);
    res.status(200).json(carrito);
  } catch (error) {
    res.status(404).send({error: error.message})
  }
}
