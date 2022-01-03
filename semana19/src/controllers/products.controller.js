import { productsService } from "../services/index.js";

export async function saveProduct(req, res) {
  const { body } = req;
  try {
    productsService.saveProduct(body);
    //logger.info(`Method: ${req.method} Url: ${req.url}`)
    res.status(200).send("Producto recibido");
  } catch (error) {
    //logger.error(error.message)
    res.status(400).send(error.message);
  }
}
export async function getProducts(req, res) {
  try {
    const products = await productsService.getProducts();
    //logger.info(`Method: ${req.method} Url: ${req.url}`)
    res.status(200).json({ products });
  } catch (error) {
    //logger.error(error.message)
    res.status(400).send(error.message);
  }
}
export async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    await productsService.deleteProduct(id);
    //logger.info(`Method: ${req.method} Url: ${req.url}`)
    res.status(200).send("Producto eliminado");
  } catch (error) {
    //logger.error(error.message)
    res.status(400).send(error.message);
  }
}
export async function updateProduct(req, res) {
  const { id } = req.params;
  const { body } = req;
  try {
    await productsService.updateProduct(id, body);
    //logger.info(`Method: ${req.method} Url: ${req.url}`)
    res.status(200).send("Producto actualizado");
  } catch (error) {
    //logger.error(error.message)
    res.status(400).send(error.message);
  }
}
