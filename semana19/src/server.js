import express from "express";
import handlebars from "express-handlebars";
import emoji from "node-emoji";
import moment from "moment";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import passport from "./utils/passport-local.util.js";
import pkg from "passport-facebook";
const { Strategy } = pkg;
//import path from "path";

import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

import favicon from "serve-favicon";

import { productsRouter, messagesRouter, authRouter, randomRouter } from "./routers/index.js";
import { productsService, messagesService } from "./services/index.js";
import ProductTestRoute from "./routers/products-test.router.js";
import { AuthController, productsController } from "./controllers/index.js";

import MongoStore from "connect-mongo";
import session from "express-session";
//import * as Middlewares from "./middlewares/auth.middleware.js";
import minimist from "minimist";

import cPus from "os";
const nCpus = cPus.cpus().length;
import cluster from "cluster";
import compression from "compression";

import "./DB/dbMongo.js";
import config from "./config.js";
import { logger } from "./logger.js";

//const PORT = parseInt(process.argv[2]) || 8080;
// const { puerto, _, debug } = minimist(process.argv.slice(2), config);
// _.push(puerto)
// _.push(debug)
const PORT = process.env.PORT || 8080;
//console.log(PORT);
// if (_.find(element => String(element) === "CLUSTER")) {
//   if (cluster.isPrimary) {
//     for (let i = 0; i < 3; i++) {
//       cluster.fork();
//     }
//     cluster.on('exit', (worker, code, signal) => {
//       console.log(`Worker PID ${worker.process.pid} died`)
//       cluster.fork();
//     })
//   } else {
//     dotenv.config();

//     const app = express();
//     const httpServer = new HttpServer(app);

//     app.use(cors());
//     app.use(express.json());
//     app.use(express.urlencoded({ extended: true }));
//     app.use(favicon("./src/favicon.jpg"));
//     app.use(morgan("dev"));

//     app.use("/api/randoms", randomRouter.router);

//     httpServer.listen(PORT, () => {
//       console.log(emoji.get("computer"), `Server started on port http://localhost:${PORT}-PID ${process.pid}`);
//     });
//   }
// }
// else {
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
    maxAge: 600000,
  },
  rolling: true,
});
// passport.use(
//   new Strategy(
//     {
//       clientID: process.env.FACEBOOK_ID,
//       clientSecret: process.env.FACEBOOK_SECRET,
//       callbackURL: "/auth/facebook/callback",
//       profileFields: ["id", "displayName", "photos"],
//       scope: ["email"],
//     },
//     (accessToken, refreshToken, userProfile, done) => {
//       console.log(userProfile);
//       return done(null, userProfile);
//     }
//   )
// );
app.use(passport.initialize());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon("./src/favicon.jpg"));
app.use(morgan("dev"));
app.use(sessionMiddleware);
app.use(passport.session());
app.use("/productos", compression(), sessionMiddleware, productsRouter.router);
app.use("/mensajes", compression(), sessionMiddleware, messagesRouter.router);
app.use("/", compression(), authRouter.router);
app.use("/api/productos-test", compression(), sessionMiddleware, new ProductTestRoute());

app.use("/api/randoms", randomRouter.router);
// const { puerto, _, debug } = minimist(process.argv.slice(2), config);
// _.push(puerto)
// _.push(debug)

io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res, next);
});

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
});

app.engine(".hbs", handlebars({ extname: ".hbs", defaultLayout: "index.hbs" }));
app.set("views", "./src/views");
app.set("view engine", "hbs");
app.use(express.static("public"));
 
app.get("/index", compression(), (req, res) => {
  logger.info(`Method: ${req.method} Url: ${req.url}`)
  if (req.isAuthenticated()) {
    const user = req.user;
    
    res.render("main", {
      username: user.displayName,
      photo: user.photos[0].value
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/failLogin", compression(), (req, res) => {
  logger.info(`Method: ${req.method} Url: ${req.url}`)
  res.render("login-error", {});
});

// app.get("/login", (req, res) => {
//   res.sendFile(path.resolve() + "/public/login.html");
// });
app.get("/auth/facebook", passport.authenticate("facebook"));

app.get("/auth/facebook/callback", passport.authenticate("facebook", { successRedirect: "/index", failureRedirect: "/failLogin", }), AuthController.postLogin);
// app.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/");
// });
// app.get("/login", (req, res) => {
//   if (req.session.user) {
//     return res.redirect("/");
//   }
//   const { user } = req.query;
//   req.session.user = user;
//   req.session.admin = true;
//   if (req.session.user) {
//     return res.redirect("/");
//   }
//   res.render("login");
// });

// app.get("/logout", sessionMiddleware, (req, res) => {
//   if (!req.session.user) {
//     return res.redirect("/login");
//   }
//   let user = req.session.user;
//   req.session.destroy((err) => {
//     if (!err) {
//       res.render("logout", {
//         user,
//       });
//     } else {
//       console.log(err);
//       res.json({ err });
//     }
//   });
// });

app.get("/productos-test", compression(), sessionMiddleware, async (req, res) => {
  logger.info(`Method: ${req.method} Url: ${req.url}`)
  res.render("test");
});
app.get("/info", compression(), (req, res) => {
  logger.info(`Method: ${req.method} Url: ${req.url}`)
  // console.log({
  //   argIn: _,
  //   plataforma: process.platform,
  //   version: process.version,
  //   memoria: process.memoryUsage().rss,
  //   pid: process.pid,
  //   carpeta: process.cwd(),
  //   pathExec: process.execPath,
  //   nCpus
  // });
  res.render("info", {
    argIn: _,
    plataforma: process.platform,
    version: process.version,
    memoria: process.memoryUsage().rss * 0.001,
    pid: process.pid,
    carpeta: process.cwd(),
    pathExec: process.execPath,
    nCpus
  })
})
app.get('*', (req, res) => {
  logger.warn(`Method: ${req.method} Url: ${req.url} Doesn´t exist`)
  res.send('Ruta no definida')
})
httpServer.listen(PORT, () => {
  console.log(emoji.get("computer"), "Servidor Puerto: " + PORT);
});
// }

