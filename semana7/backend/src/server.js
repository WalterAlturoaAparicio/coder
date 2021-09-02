/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const emoji = require("node-emoji");

const { Router } = express;

const favicon = require("serve-favicon");

const { Contenedor } = require("./contenedor.js");
const { Carrito } = require("./carrito.js");

const app = express();

const routerProductos = new Router();
const routerCarrito = new Router();
const port = 8082;

let contenedor = new Contenedor("./src/productos.txt");
let carrito = new Carrito("./src/carritos.txt");

let isAdmin = false;

app.use(favicon(__dirname + "/favicon.jpg"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);
/* -------------------------------------------------------------------------- */
/*                                 API CARRITO                                */
/* -------------------------------------------------------------------------- */
routerCarrito.post("/", async (req, res) => {
  try {
    await carrito.getAll();
    res.status(200).json({
      result: "ok",
      id: await carrito.save(),
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});
routerCarrito.post("/:id/productos", async (req, res) => {
  try {
    //await carrito.getAll();
    await carrito.saveProduct(Number(req.params.id), req.body.product);
    res.status(200).json({
      result: "ok",
      id: req.params.id,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});
routerCarrito.delete("/:id", async (req, res) => {
  try {
    await carrito.deleteById(Number(req.params.id));
    res.status(200).json({
      result: "ok",
      id: req.params.id,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});
routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
  try {
    await carrito.deleteProducts(
      Number(req.params.id),
      Number(req.params.id_prod)
    );
    res.status(200).json({
      result: "ok",
      id: req.params.id,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});
routerCarrito.get("/:id/productos", async (req, res) => {
  try {
    await carrito.getById(Number(req.params.id));
    res.status(200).json({
      result: "ok",
      products: await carrito.getProducts(Number(req.params.id)),
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});

/* -------------------------------------------------------------------------- */
/*                                API PRODUCTOS                               */
/* -------------------------------------------------------------------------- */
routerProductos.post("/", async (req, res) => {
  try {
    if (isAdmin) {
      await contenedor.getAll();
      res.status(200).json({
        result: "ok",
        id: await contenedor.save({
          title: req.body.title,
          price: req.body.price,
          stock: Number(req.body.stock),
          description: req.body.description,
          code: req.body.code,
          thumbnail: req.body.thumbnail,
        }),
      });
    } else throw new Error("no autorizado");
  } catch (error) {
    if (error.message === "no autorizado") {
      res.status(400).json({
        error: "-3",
        description: `ruta /api/productos`,
        metodo: "post no implementado",
      });
    } else {
      res.status(400).json({
        error: error.message,
      });
    }
  }
});

routerProductos.put("/:id", async (req, res) => {
  try {
    if (isAdmin) {
      let oldProduct = await contenedor.getById(Number(req.params.id));
      await contenedor.modifyProduct({
        id: Number(req.params.id),
        title: req.body.title,
        price: req.body.price,
        stock: Number(req.body.stock),
        description: req.body.description,
        code: req.body.code,
        thumbnail: req.body.thumbnail,
      });
      res.status(200).json({
        anterior: oldProduct,
        nuevo: await contenedor.getById(Number(req.params.id)),
      });
    } else throw new Error("no autorizado");
  } catch (error) {
    if (error.message === "no autorizado") {
      res.status(400).json({
        error: "-2",
        description: `ruta /api/productos/${req.params.id}`,
        metodo: "put no implementado",
      });
    } else {
      res.status(404).json({
        error: error.message,
      });
    }
  }
});

routerProductos.delete("/:id", async (req, res) => {
  try {
    if (isAdmin) {
      await contenedor.deleteById(Number(req.params.id));
      res.status(200).json({
        result: "ok",
        id: req.params.id,
      });
    } else throw new Error("no autorizado");
  } catch (error) {
    if (error.message === "no autorizado") {
      res.status(400).json({
        error: "-1",
        description: `ruta /api/productos/${req.params.id}`,
        metodo: "delete no implementado",
      });
    } else {
      res.status(404).json({
        error: error.message,
      });
    }
  }
});

routerProductos.get("/:id?", async (req, res) => {
  try {
    if (req.params.id) {
      res.status(200).send(await contenedor.getById(Number(req.params.id)));
    } else {
      await contenedor.getAll((isServer = true));
      res.status(200).send(contenedor.data);
    }
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});
app.post("/isAdmin", (req, res) => {
  isAdmin = !isAdmin;
  res.status(200).json({
    isAdmin
  });
  //redirect(301, "/api/productos")
});
app.get("/isAdmin", (req, res)=>{
    res.status(200).json({
      isAdmin
    })
})
app.listen(port, () => {
  console.log(emoji.get("computer"), "Servidor Puerto: " + port);
});
