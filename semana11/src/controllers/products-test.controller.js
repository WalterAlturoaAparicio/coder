import ProductsTestService from "../services/products-test.service.js";

export default class ProductTestController {
  constructor() {
    this.productsTestService = new ProductsTestService();

    this.createProducts = this.createProducts.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }

  async createProducts(req, res, next) {
    const cant = req.query.cant;
    try {
      const products = await this.productsTestService.createProducts(cant);
      res.status(200).json({products});
    } catch (error) {
      next(error);
    }
  }

  async getProducts(req, res, next) {
    let id = null;
    if (req?.query?.id) id = req.query.id;
    try {
      const products = await this.productsTestService.getProducts(id);
      res.status(200).json({products});
    } catch (error) {
      next(error);
    }
  }

  async addProduct(req, res, next) {
    try {
      await this.productsTestService.addProduct();
      res.status(200).send("Producto agregado");
    } catch (error) {
      next(error);
    }
  }
}
