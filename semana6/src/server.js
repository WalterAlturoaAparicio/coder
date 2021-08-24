/* eslint-disable no-undef */
const express = require("express");
const handlebars = require("express-handlebars");
const emoji = require("node-emoji");
const moment = require("moment");
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

const messages = [
]
io.on("connection", (socket) => {
  socket.on("dataFront", async (data) => {
    try {
      await contenedor.save({
        title: data.title,
        price: data.price,
        thumbnail: data.thumbnail,
      });
    } catch (error) {
      socket.emit('errores', {error});
    }
  });
  const fecha = moment().format();

  socket.emit('messageBackend', messages);
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

// app.get('/', (req, res) => {
// 	res.render("main");
// })
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