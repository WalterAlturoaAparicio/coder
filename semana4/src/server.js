const express = require("express");
const { Router } = express;
const { Contenedor } = require("./contenedor.js");

const app = express();
const routerProductos = new Router();

let contenedor = new Contenedor("./src/productos.txt");

app.use(express.static("./src/static"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", routerProductos);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/index.html");
});

routerProductos.get("/", async (req, res, next) => {
  await contenedor.getAll();
  res.status(200).send(contenedor.data);
});

routerProductos.get("/:id", async (req, res, next) => {
  res.status(200).send(await contenedor.getById(Number(req.params.id)));
});

routerProductos.post("/", async (req, res, next) => {
  try {
    await contenedor.save({
      title: req.body.title,
      price: req.body.price,
      thumbnail: req.body.thumbnail,
    });
    res.status(200).redirect(301, '/api/productos');
  } catch (error) {
    res.status(200).redirect(301, '/api/productos');
  }
});
routerProductos.put("/:id", async (req, res, next) => {
  try {
    // console.log(req.query);
    // await contenedor.modifyProduct({
    //   id: req.query.id,
    //   title: req.query.title,
    //   price: req.query.price,
    //   thumbnail: req.query.thumbnail,
    // });
    // res.status(200).redirect(301, '/api/productos');
  } catch (error) {
    //res.status(200).redirect(301, '/api/productos');
    console.log(error);
  }
});
app.listen(8085, () => {
  console.log("Servidor Puerto: " + 8085);
});
