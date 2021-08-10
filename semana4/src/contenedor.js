const fs = require("fs");
const { title } = require("process");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
    this.id = 1;
    this.data = [];
  }

  async save(obj) {
    try {
      await this.getAll();
      this.data.map((product) => {
        if (product.title === obj.title)
          throw new Error(`El producto ${obj.title} ya esta en la lista `);
      });
      let newObj = {
        title: obj.title,
        price: obj.price,
        thumbnail: obj.thumbnail,
        id: this.id,
      };
      this.data.push(newObj);
      this.id++;
      await fs.promises.writeFile(
        this.archivo,
        JSON.stringify(this.data, null, 2)
      );
      return this.id;
    } catch (error) {
      throw new Error(`El producto ${obj.title} ya esta en la lista `);
    }
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
        throw new Error('producto no encontrado')
      }
      return retornar;
    } catch (error) {
      throw error
    }
  }
  async modifyProduct(obj) {
    try {
      await this.getAll();
      let producto = await this.getById(obj.id);
      if (producto.error) throw new Error(producto.error);

      this.data.map((product) => {
        if (producto.id === product.id) {
          product.title = obj.title;
          product.price = obj.price;
          product.thumbnail = obj.thumbnail;
        }
      });
      await fs.promises.writeFile(
        this.archivo,
        JSON.stringify(this.data, null, 2)
      );
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.archivo, "utf-8");
      if (data == []) throw new Error("No hay productos");
      if (data) {
        this.data = JSON.parse(data);
        this.data.map((product) => {
          if (this.id < product.id) {
            this.id = product.id + 1;
            this.id++;
          }
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      await this.getAll();

      let productError = await this.getById(id);
      if (productError.error) throw new Error(producto.error);

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
//     id: 2,
//     title: "Reloj",
//     price: 250.0,
//     thumbnail:
//       "https://cdn3.iconfinder.com/data/icons/education-209/64/rolex-math-tool-school-256.png",
//   });
// }
// func();
