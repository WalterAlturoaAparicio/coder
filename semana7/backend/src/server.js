/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const emoji = require("node-emoji");

const { Router } = express;

const favicon = require("serve-favicon");

const { Contenedor } = require("./contenedor.js");

const app = express();

const routerProductos = new Router();
const port = 8082;

let contenedor = new Contenedor("./src/productos.txt");

app.use(favicon(__dirname + "/favicon.jpg"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api/productos", routerProductos);

routerProductos.post("/", async (req, res) => {
  try {
    await contenedor.getAll();
    res.status(200).json({
      ok: await contenedor.save({
        title: req.body.title,
        price: req.body.price,
        stock: Number(req.body.stock),
        description: req.body.description,
        code: req.body.code,
        thumbnail: req.body.thumbnail,
      })
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

routerProductos.put("/:id", async (req, res) => {
  try {
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
  } catch (error) {
    res.status(404).json({
      error: "producto no encontrado",
    });
  }
});

routerProductos.delete("/:id", async (req, res) => {
  try {
    await contenedor.deleteById(Number(req.params.id));

    res.status(200).json({
      result: "ok",
      id: req.params.id,
    });
  } catch (error) {
    res.status(404).json({
      error: "producto no encontrado",
    });
  }
});

routerProductos.get("/:id?", async (req, res) => {
  try {
    if (req.params.id) {
      res.status(200).send(await contenedor.getById(Number(req.params.id)));
    } else {
      await contenedor.getAll(isServer=true);
      res.status(200).send(contenedor.data);
    }
  } catch (error) {
    res.status(404).json({
      error: "producto no encontrado",
    });
  }
});

app.listen(port, () => {
  console.log(emoji.get("computer"), "Servidor Puerto: " + port);
});