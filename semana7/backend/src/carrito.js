const fs = require("fs");
const moment = require("moment");

class Carrito {
  constructor(archivo) {
    this.archivo = archivo;
    this.id = 1;
    this.data = [];
  }
  async save() {
    await this.getAll();
    let newObj = {
      id: this.id,
      date: moment().format(),
      productos: [],
    };
    this.id++;
    this.data.push(newObj);
    await fs.promises.writeFile(
      this.archivo,
      JSON.stringify(this.data, null, 2)
    );
    return this.id - 1;
  }
  async saveProduct(id, obj) {
    await this.getAll();
    let carrito = await this.getById(id);
    if (carrito.error) throw new Error(carrito.error);

    this.data.map((carrito) => {
      if (carrito.id === id) {
        carrito.productos.push(obj);
      }
    });

    await fs.promises.writeFile(
      this.archivo,
      JSON.stringify(this.data, null, 2)
    );
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
        throw new Error("carrito no encontrado");
      }
      return retornar;
    } catch (error) {
      throw error;
    }
  }

  async getAll(isServer = false) {
    try {
      const data = await fs.promises.readFile(this.archivo, "utf-8");
      if (data == [] && isServer) throw new Error("No hay carritos");
      else if (data == []) return [];
      if (data) {
        this.data = JSON.parse(data);
        this.data.map((carrito) => {
          if (this.id <= carrito.id) {
            this.id = carrito.id+1;
          }
        });
      }
    } catch (error) {
      return error;
    }
  }
  async getProducts(id) {
    try {
      await this.getAll();
      let carro = await this.getById(id);
      if (Object.keys(carro.productos).length === 0) 
        throw new Error("No hay productos");
      return carro.productos;
      
    } catch (error) {
      //console.log(error.message);
      throw error;
    }
  }

  async deleteById(id) {
    try {
      await this.getAll();

      let carritoError = await this.getById(id);
      if (carritoError.error) throw new Error(carritoError.error);

      this.data = this.data.filter((carrito) => {
        return carrito.id !== id;
      });

      await fs.promises.writeFile(
        this.archivo,
        JSON.stringify(this.data, null, 2)
      );
    } catch (error) {
      throw error;
    }
  }
  async deleteProducts(id, id_product) {
    await this.getAll();
    let carrito = await this.getById(id);
    if (carrito.error) throw new Error(carrito.error);
    let exist = false;
    carrito.productos = carrito.productos.filter((product)=>{
        if (product.id === id_product) exist = true;
        return product.id !== id_product;
    })
    if (!exist) throw new Error("No esta ese producto en el carrito");
    this.data.map((carro)=>{
        if (carro.id === id) {
            carro = carrito;
        }
    })
    try {
      await fs.promises.writeFile(this.archivo, JSON.stringify(this.data,null,2));
    } catch (error) {
      throw error;
    }
  }
}
exports.Carrito = Carrito;

/********************************* TEST *************************************/

// let carrito = new Carrito("carritos.txt");
// let contenedor = new Contenedor("productos.txt");

// async function func() {
//     //await carrito.getAll();
//     //await carrito.save();
//   // console.log(await carrito.getById(1));
    
//     // let producto = await contenedor.getById(1);
//     // let producto1 = await contenedor.getById(2);
//     // await carrito.saveProduct(1, producto);
//     // await carrito.saveProduct(1, producto1);
//     // //setTimeout(async ()=> await carrito.saveProduct(1, producto1), 1000)
    
//     // await carrito.deleteProducts(1, 1);
// //   console.log(await carrito.getProducts(1));
//     // console.log(await carrito.deleteById(1));
// }
// func();
