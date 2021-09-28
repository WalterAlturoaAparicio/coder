const express = require("express");
const handlebars = require("express-handlebars");
const emoji = require("node-emoji");
const moment = require("moment");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const favicon = require('serve-favicon');

const routerMessages = require('./routers/messages.router.js');
const serviceMessage = require('./services/messages.service.js');

const routerProducts = require('./routers/products.router.js');
const serviceProducts = require('./services/products.service.js');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8080;
app.use(favicon(__dirname + '/favicon.jpg'));


io.on("connection", async (socket) => {
  const fecha = moment().format();
  socket.emit("dataBackend");
  socket.on("dataFront", async (data) => {
    const newProduct = {
      title: data.title,
      price: data.price,
      thumbnail: data.thumbnail,
      date: fecha,
      stock: data.stock,
      description: data.description,
      code: data.code
    }
    await serviceProducts.saveProduct(newProduct);
    socket.emit("notificacionBack")
    io.sockets.emit("dataBackend");
  });
  
  socket.emit("messageBackend");
  socket.on("messageFront", async (data) => {
    const newMessage = {
      email: data.email,
      message: data.message,
      date: fecha
    }
    await serviceMessage.saveMessage(newMessage);
    io.sockets.emit("messageBackend");
  });
});

app.use('/mensajes', routerMessages);
app.use('/productos', routerProducts);
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
  
  res.render("main");
});

httpServer.listen(port, () => {
  console.log(emoji.get("computer"), "Servidor Puerto: " + port);
});
