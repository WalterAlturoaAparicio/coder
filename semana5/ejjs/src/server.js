const express = require('express')
const app = express()
const { Contenedor } = require("./contenedor.js");

const port = 8082;
let contenedor = new Contenedor("./src/productos.txt");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("main");
});
app.get("/productos", async (req, res) => {
  try {
    await contenedor.getAll();
    const data = contenedor.data;
    res.render("productos", {
      data,
      exist: true
    });
  } catch (error) {
    res.render("productos", {
      exist: false
    });
  }
});
app.post("/productos", async (req, res) => {
  try {
    await contenedor.save({
      title: req.body.title,
      price: req.body.price,
      thumbnail: req.body.thumbnail,
    });
    res.status(200).redirect("back");
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.listen(port, () => {
    console.log("Servidor Puerto: " + port);
  });