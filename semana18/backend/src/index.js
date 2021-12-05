import express from "express";
import cors from "cors";
import emoji from "node-emoji";
import dotenv from "dotenv";
import morgan from "morgan";
import handlebars from "express-handlebars";

import { authRouter, carritoRouter, productRouter } from "../src/routers/index.js";
import "./DB/db.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "./utils/passport-local.util.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

const options = { userNewUrlParser: true, useUnifiedTopology: true };
const sessionMiddleware = session({
  store: MongoStore.create({
    mongoUrl: process.env.MONGOCLOUD,
    options,
  }),
  resave: false,
  saveUninitialized: false,
  secret: process.env.SECRET,
  cookie: {
    maxAge: 600000,
  },
  resave: true,
  rolling: true,
});

app.use(passport.initialize());
app.use(morgan("dev"));
app.use(sessionMiddleware);
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.session());


app.use("/productos", sessionMiddleware, productRouter.router);
app.use("/carritos", sessionMiddleware, carritoRouter.router);
app.use("/", authRouter.router);

app.engine(".hbs", handlebars({ extname: ".hbs", defaultLayout: "index.hbs" }));
app.set("views", "./src/views");
app.set("view engine", "hbs");
app.use(express.static("public"));

app.get("/index", (req, res) => {
  //logger.info(`Method: ${req.method} Url: ${req.url}`)
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

app.get("/failLogin", (req, res) => {
  //logger.info(`Method: ${req.method} Url: ${req.url}`)
  res.render("login-error", {});
});
app.get('*', (req, res) => {
  //logger.warn(`Method: ${req.method} Url: ${req.url} Doesn´t exist`)
  res.send('Ruta no definida')
})
app.listen(PORT, () => {
  console.log(emoji.get("computer"), "Servidor Puerto: " + PORT);
});
