import generateProduct from "../utils/products.utils.js";

export default class ProductsTestService {
  constructor() {
    this.products = [];
    this.lastId = 0;

    this.createProducts = this.createProducts.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }

  async createProducts(cant = 5) {
    let cantidad = cant;
    if (cant) cantidad = Number(cant);
    const products = [];
    for (let i = 0; i < cantidad; i++) {
      const product = {
        id: i + 1,
        ...generateProduct(),
      };
      products.push(product);
    }
    this.lastId = Number(cant);
    this.products = products;
    
    return products;
  }

  async getProducts(id) {
    if (id) {
      return this.products.filter((product) => product.id === Number(id));
    } else {
      return this.products;
    }
  }

  async addProduct() {
    try {
      this.products.push({
        id: this.lastId + 1,
        ...generateProduct(),
      });
      this.lastId++;
    } catch (error) {
      throw new Error(error);
    }
  }
}
