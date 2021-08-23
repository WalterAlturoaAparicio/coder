/* eslint-disable no-undef */
const express = require("express");
const handlebars = require("express-handlebars");
const emoji = require("node-emoji");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const { Contenedor } = require("./contenedor.js");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer, {
  cors: {
    origin: "http://localhost:3005",
  },
});

const port = 8082;
let contenedor = new Contenedor("./src/productos.txt");

// io.on("connection", (socket) => {
//   socket.on("dataFront", async (data) => {
//     try {
//         console.log(data);
//       await contenedor.save({
//         title: data.title,
//         price: data.price,
//         thumbnail: data.thumbnail,
//       });
//     } catch (error) {
//         throw new Error("erorrrrrrr", error);
//     }
//   });
// });
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

app.get("/", async (req, res) => {
  try {
    await contenedor.getAll();
    const data = contenedor.data;
    res.render("main", {
      data,
      exist: true,
    });
  } catch (error) {
    res.render("main", {
      exist: false,
    });
  }
});
// app.post("/", async (req, res) => {
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

httpServer.listen(port, () => {
  console.log(emoji.get("computer"), "Servidor Puerto: " + port);
});
