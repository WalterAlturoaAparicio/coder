const { Contenedor } = require("./contenedor.js");
const express = require("express");

const app = express();
let contenedor = new Contenedor("./src/productos.txt");
app.get("/productos", async (req, res, next) => {
  
  await contenedor.getAll();
  res.send(contenedor.data);
});
app.get("/productoRandom", async (req, res, next) => {
  await contenedor.getAll();
  let random = Math.floor(Math.random() * (contenedor.id + 1 - 1) + 1);
//console.log(indice);
  res.send(await contenedor.getById(random));
});
const PORT = 8080;
const serve = app.listen(PORT, () => {
  console.log(`Puerto ${PORT}`);
});

serve.on("error", (error) => {
  console.log("Errrorrrrrrrrr: ", error);
});
