import express from "express";
import handlebars from "express-handlebars";
import emoji from "node-emoji";
import moment from "moment";
import dotenv from "dotenv";
import morgan from "morgan";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

import favicon from "serve-favicon";

import { productsRouter, messagesRouter } from "./routers/index.js";
import { productsService, messagesService } from "./services/index.js";
import ProductTestRoute from "./routers/products-test.router.js";

import MongoStore from "connect-mongo";
import session from "express-session";
import * as Middlewares from "./middlewares/auth.middleware.js";

import "./DB/dbMongo.js";

dotenv.config();
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const options = { userNewUrlParser: true, useUnifiedTopology: true };

const sessionMiddleware = session({
  store: MongoStore.create({
    mongoUrl: process.env.MONGOURI,
    options,
  }),
  resave: false,
  saveUninitialized: false,
  secret: process.env.SECRET,
  cookie: {
    maxAge: 60000,
  },
  rolling: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon("./src/favicon.jpg"));
app.use(morgan("dev"));
app.use("/productos", sessionMiddleware, productsRouter.router);
app.use("/mensajes", sessionMiddleware, messagesRouter.router);
app.use("/api/productos-test", sessionMiddleware, new ProductTestRoute());

const port = process.env.PORT | 8080;

io.use((socket, next)=>{
  sessionMiddleware(socket.request, socket.request.res, next)
})
app.use(sessionMiddleware);

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
      code: data.code,
    };
    await productsService.saveProduct(newProduct);
    socket.emit("notificacionBack");
    io.sockets.emit("dataBackend");
  });
  socket.emit("messageBackend");
  socket.on("messageFront", async (data) => {
    const newMessage = {
      author: data.author,
      text: data.message,
      date: fecha,
    };
    console.log(newMessage);
    await messagesService.saveMessage(newMessage);
    io.sockets.emit("messageBackend");
  });
  socket.on("login", (data) => {
    if(data)
      socket.emit("login", data);
    else
      socket.emit("login", socket.request.session.user);
  });
  if (!socket.request.session.user) {
    socket.emit("logout")
  }
  socket.on("logout", (data)=>{
    socket.emit("logout", data);
  })
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

app.get("/", Middlewares.auth, async (req, res) => {
  res.render("main", {
    user: req.session.user
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    return res.redirect("/");
  }
  const { user } = req.query;
  req.session.user = user;
  req.session.admin = true;
  if (req.session.user) {
    return res.redirect("/");
  }
  res.render("login");
});

app.get('/logout', sessionMiddleware, (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login")
  }
  let user = req.session.user;
  req.session.destroy((err) => {
    if (!err) {
      res.render("logout", {
        user
      })
    } else {
      console.log(err);
      res.json({ err })
    }
  })
})

app.get("/productos-test", sessionMiddleware, async (req, res) => {
  res.render("test");
});
httpServer.listen(port, () => {
  console.log(emoji.get("computer"), "Servidor Puerto: " + port);
});
