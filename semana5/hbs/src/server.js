/* eslint-disable no-undef */
const express = require("express");
const handlebars = require("express-handlebars");
const { Contenedor } = require("./contenedor.js");

const app = express();
const port = 8080;
let contenedor = new Contenedor("./src/productos.txt");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
  })
);
app.set("views", "./src/views");
app.set("view engine", "hbs");

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
// routerProductos.get("/", async (req, res) => {
//   try {
//     await contenedor.getAll();
//     res.status(200).send(contenedor.data);
//   } catch (error) {
//     res.json({
//       error: "No hay productos",
//     });
//   }
// });

// routerProductos.get("/:id", async (req, res) => {
//   try {
//     res.status(200).send(await contenedor.getById(Number(req.params.id)));
//   } catch (error) {
//     // console.log(error);
//     res.status(404).json({
//       error: "producto no encontrado",
//     });
//   }
// });

// routerProductos.post("/", async (req, res) => {
//   try {
//     await contenedor.save({
//       title: req.body.title,
//       price: req.body.price,
//       thumbnail: req.body.thumbnail,
//     });
//     res.status(200);
//   } catch (error) {
//     res.status(400).json({
//       error: error.message,
//     });
//   }
// });

// routerProductos.put("/:id", async (req, res) => {
//   try {
//     let oldProduct = await contenedor.getById(Number(req.params.id));
//     await contenedor.modifyProduct({
//       id: Number(req.params.id),
//       title: req.body.title,
//       price: req.body.price,
//       thumbnail: req.body.thumbnail,
//     });
//     res.status(200).json({
//       anterior: oldProduct,
//       nuevo: await contenedor.getById(Number(req.params.id)),
//     });
//   } catch (error) {
//     res.status(404).json({
//       error: "producto no encontrado",
//     });
//   }
// });

// routerProductos.delete("/:id", async (req, res) => {
//   try {
//     await contenedor.deleteById(Number(req.params.id));

//     res.status(200).json({
//       result: "ok",
//       id: req.params.id,
//     });
//   } catch (error) {
//     res.json({
//       error: "producto no encontrado",
//     });
//   }
// });

app.listen(port, () => {
  console.log("Servidor Puerto: " + port);
});
