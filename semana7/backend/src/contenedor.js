/* eslint-disable no-useless-catch */
const fs = require("fs");
const moment = require("moment");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
    this.id = 1;
    this.data = [];
  }
  async valid(obj) {
    try {
      await this.getAll();
      this.data.map((product) => {
        if (product.title === obj.title)
          throw new Error(`El producto ${obj.title} ya esta en la lista `);
      });
    } catch (error) {
      throw error;
    }
  }
  async save(obj) {
    await this.getAll();
    this.data.map((product) => {
      if (product.title === obj.title)
        throw new Error(`El producto ${obj.title} ya esta en la lista `);
    });
    let newObj = {
      title: obj.title,
      date: moment().format(),
      description: obj.description,
      code: obj.code,
      price: obj.price,
      thumbnail: obj.thumbnail,
      stock: obj.stock,
      id: this.id,
    };
    this.id++;
    this.data.push(newObj);
    await fs.promises.writeFile(
      this.archivo,
      JSON.stringify(this.data, null, 2)
    );
    return this.id - 1;
  }

  async getById(id) {
    try {
      await this.getAll();
      let retornar = null;
      this.data.map((product) => {
        if (product.id === id) {
          retornar = product;
        }
      });
      if (retornar === null) {
        throw new Error("producto no encontrado");
      }
      return retornar;
    } catch (error) {
      throw error;
    }
  }
  async modifyProduct(obj) {
    try {
      await this.getAll();
      let producto = await this.getById(obj.id);
      if (producto.error) throw new Error(producto.error);
      producto.title = obj.title;
      producto.description = obj.description;
      producto.code = obj.code;
      producto.stock = obj.stock;
      producto.price = obj.price;
      producto.thumbnail = obj.thumbnail;
      await fs.promises.writeFile(
        this.archivo,
        JSON.stringify(this.data, null, 2)
      );
    } catch (error) {
      throw error;
    }
  }

  async getAll(isServer=false) {
    try {
      const data = await fs.promises.readFile(this.archivo, "utf-8");
      if (data == [] && isServer) throw new Error("No hay productos");
      else if (data == []) return [];
      if (data) {
        this.data = JSON.parse(data);
        this.data.map((product) => {
          if (this.id <= product.id) {
            this.id = product.id+1;
          }
        });
      }
    } catch (error) {
      return error;
    }
  }

  async deleteById(id) {
    try {
      await this.getAll();

      let productError = await this.getById(id);
      if (productError.error) throw new Error(productError.error);

      this.data = this.data.filter((product) => {
        return product.id !== id;
      });

      await fs.promises.writeFile(
        this.archivo,
        JSON.stringify(this.data, null, 2)
      );
    } catch (error) {
      throw error;
    }
  }
  async deleteAll() {
    this.data = [];
    this.id = 1;
    try {
      await fs.promises.writeFile(this.archivo, JSON.stringify(this.data));
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }
}
exports.Contenedor = Contenedor;
/* -------------------------------------------------------------------------- */
/*                                    test                                    */
/* -------------------------------------------------------------------------- */

// let producto1 = {
//   title: "Escuadra",
//   price: 123.45,
//   thumbnail:
//     "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
// };
// let producto2 = {
//   title: "Calculadora",
//   price: 234.56,
//   thumbnail:
//     "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
// };
// let producto3 = {
//   title: "Globo Terráqueo",
//   price: 345.67,
//   thumbnail:
//     "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
// };
// let contenedor = new Contenedor("productos.txt");

// async function func() {
//   contenedor.modifyProduct({
//     title: "Sissasashfhsakd",
//     date: "2021-08-31T15:23:36-05:00",
//     description: "Esfera fdafs cuya superficie se representa la disposición respectiva que tienen las tierras y mares en nuestro planeta.",
//     code: "4546DASD4165DA",
//     price: 13.67,
//     thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
//     stock: 10,
//     id: 3
//   });
// }
// func();
