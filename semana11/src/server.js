import express from "express";
import handlebars from "express-handlebars";
import emoji from "node-emoji";
import moment from "moment";
import dotenv from 'dotenv';
import morgan from 'morgan';
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

import favicon from 'serve-favicon';

import { productsRouter, messagesRouter } from './routers/index.js';
import { productsService, messagesService } from "./services/index.js";
import ProductTestRoute from "./routers/products-test.router.js";

import "./DB/dbMongo.js";

dotenv.config();
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon('./src/favicon.jpg'));
app.use(morgan('dev'));
app.use('/productos', productsRouter.router);
app.use("/mensajes", messagesRouter.router);
app.use("/api/productos-test", new ProductTestRoute())

const port = process.env.PORT | 8080;

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
      author: data.author,
      text: data.message,
      date: fecha
    }
    console.log(newMessage);
    await messagesService.saveMessage(newMessage);
    io.sockets.emit("messageBackend");
  });
});



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
  res.render("login");
});
app.get("/productos-test", async (req, res) => {
  res.render("test");
});
httpServer.listen(port, () => {
  console.log(emoji.get("computer"), "Servidor Puerto: " + port);
});
