import express from "express";
import handlebars from "express-handlebars";
import emoji from "node-emoji";
import moment from "moment";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

import favicon from 'serve-favicon';

import { productsRouter, messagesRouter } from './routers/index.js';
import { productsService } from "./services/index.js";

import "./DB/dbMongo.js";

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8080;
app.use(favicon('./src/favicon.jpg'));


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
    await productsService.saveProduct(newProduct);
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
    console.log(newMessage);
    //await saveMessage(newMessage);
    io.sockets.emit("messageBackend");
  });
});

app.use('/productos', productsRouter.router);
app.use("/mensajes", messagesRouter.router);

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: "./src/views/layouts",
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
