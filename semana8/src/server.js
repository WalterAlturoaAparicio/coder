/* eslint-disable no-undef */
const express = require("express");
const handlebars = require("express-handlebars");
const emoji = require("node-emoji");
const moment = require("moment");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const favicon = require('serve-favicon');

const { Contenedor } = require("./contenedor.js");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const port = 8081;
let contenedor = new Contenedor("./src/productos.txt");
app.use(favicon(__dirname + '/favicon.jpg'));

const messages = [];
io.on("connection", (socket) => {
  socket.on("dataFront", (data) => {
    contenedor
      .save({
        title: data.title,
        price: data.price,
        thumbnail: data.thumbnail,
      })
      .then((data) => {
        socket.emit("notificacionBack");
        io.sockets.emit("dataBackend", data);
      }).catch((error)=> {
        socket.emit("errores", {error: error.message});     
      });
  });
  const fecha = moment().format();

  socket.emit("messageBackend", messages);
  socket.on("messageFront", (data) => {
    messages.push({
      email: data.email,
      message: data.message,
      fecha,
    });
    io.sockets.emit("messageBackend", messages);
  });
});
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
// app.get("/valid/:title/:price/:thumbnail", async (req, res)=> {
//   try {
//     await contenedor.valid({
//       title: req.params.title,
//       price: req.params.price,
//       thumbnail: req.params.thumbnail,
//     });
//     res.status(200).json({notification: "insercion Correcta"});
//   } catch (error) {
//     res.json({
//       error: error.message,
//     });
//   }
// })
app.get("/productos", async (req, res) => {
  try {
    await contenedor.getAll();
    res.send(contenedor.data);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

httpServer.listen(port, () => {
  console.log(emoji.get("computer"), "Servidor Puerto: " + port);
});
