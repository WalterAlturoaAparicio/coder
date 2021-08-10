const express = require("express");
const { Router } = express;
const { Contenedor } = require("./contenedor.js");

const app = express();
const routerProductos = new Router();
const port = 8080;
let contenedor = new Contenedor("./src/productos.txt");

app.use(express.static("./src/static"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", routerProductos);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/index.html");
});

routerProductos.get("/", async (req, res) => {
  try {
    await contenedor.getAll();
    res.status(200).send(contenedor.data);
  } catch (error) {
    // console.log(error);
    res.json({
      error: 'No hay productos',
    });
  }
});

routerProductos.get("/:id", async (req, res) => {
  try {
    res.status(200).send(await contenedor.getById(Number(req.params.id)));
  } catch (error) {
    // console.log(error);
    res.json({
      error: 'producto no encontrado',
    });
  }
});

routerProductos.post("/", async (req, res) => {
  try {
    await contenedor.save({
      title: req.body.title,
      price: req.body.price,
      thumbnail: req.body.thumbnail,
    });
    res.status(200).redirect(301, "/api/productos");
  } catch (error) {
    //console.log(error);
    res.json({
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
      thumbnail: req.body.thumbnail,
    });
    res.status(200).json({
      anterior: oldProduct,
      nuevo: await contenedor.getById(Number(req.params.id)),
    });
  } catch (error) {
    res.json({
      error: 'producto no encontrado',
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
    res.json({
      error: 'producto no encontrado',
    });
  }
});

app.listen(port, () => {
  console.log("Servidor Puerto: " + port);
});