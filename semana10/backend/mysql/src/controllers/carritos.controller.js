import { carritoService } from "../services/index.js";
import moment from "moment";

export async function createCarrito(req, res) {
  const fecha = moment().format();
  const data = {
    date: fecha,
  };
  try {
    const response = await carritoService.createCarrito(data);
    res.status(200).json({ id: response[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
export async function getCarritos(req, res) {
  try {
    const products = await carritoService.getCarritos(req.params.id);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
export async function deleteCarrito(req, res) {
  try {
    await carritoService.deleteCarrito(req.params.id);

    res.status(200).json({
      result: "ok",
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
export async function saveProductCarrito(req, res) {
  const { body } = req;
  const data = {
    product_id: body.product_id,
    carrito_id: req.params.id,
  };
  try {
    const response = await carritoService.saveProductCarrito(data)
    res.status(200).json({id: response[0]})
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export async function deleteProductCarrito(req, res) {
  try {
    await carritoService.deleteProductCarrito(req.params.id, req.params.id_prod)
    res.status(200).json({
      result: "ok",
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export async function getProductsCarritoById(req, res) {
  try {
    const response =  await carritoService.getProductsCarritoById(req.params.id)
    res.status(200).json(response)
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
