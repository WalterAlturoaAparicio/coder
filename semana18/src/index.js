import express from "express";
import cors from "cors";
import emoji from "node-emoji";
import dotenv from "dotenv";
import morgan from "morgan";
import handlebars from "express-handlebars";
import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import { authRouter, carritoRouter, productRouter } from "../src/routers/index.js";
import "./DB/db.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "./utils/passport-local.util.js";
import { carritoService } from "./services/index.js";
import { sendMailEthereal } from "./services/mail.service.js";
import twilio from 'twilio';

dotenv.config();
const client = twilio(process.env.SID, process.env.TOKEN);
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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.session());


app.use("/productos", sessionMiddleware, productRouter.router);
app.use("/carritos", carritoRouter.router);
app.use("/", authRouter.router);

app.engine(".hbs", handlebars({ extname: ".hbs", defaultLayout: "index.hbs", handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set("views", "./src/views");
app.set("view engine", "hbs");
app.use(express.static("public"));

app.get("/index", async (req, res) => {
  //logger.info(`Method: ${req.method} Url: ${req.url}`)
  if (req.isAuthenticated()) {
    const user = req.user;
    const carrito = await carritoService.getCarrito(user);
    if (!carrito) {
      const newCart = await carritoService.createCarrito({ user });
      res.render("main", {
        username: user.displayName,
        photo: user.photos[0].value,
        user: newCart._id,
      });
      return;
    }
    //console.log(carrito._id);
    res.render("main", {
      username: user.displayName,
      photo: user.photos[0].value,
      user: carrito._id,
    });
  } else {
    res.redirect("/login");
  }
});
async function sendWP(user_cel, message_wa) {
  try {
    console.log(user_cel);
    const message = {
      body: message_wa,
      from: "whatsapp:+14155238886",
      to: `whatsapp:${user_cel}`,
    };
    const response = await client.messages.create(message);
    //console.log("Whatsapp=>", response);
  } catch (error) {
    console.log(error);
  }
}
app.get("/comprar/:id", async (req, res) => {
  if (req.isAuthenticated()) {
    const productos = await carritoService.getProductsCarritoById(req.params.id);
    //console.log(carrito);
    let total = 0;
    let products_mail = "";
    let products_wa = "";
    productos.map((product) => {
      total += product.price;
      products_mail += `
      ---------------------------------
      <br/> Producto: ${product.title}
      <br/> Code: ${product.code}
      <br/> Price: ${product.price}<br/>
      `;
      products_wa += `
      ---------------------------------
      \n Producto: ${product.title}
      \n Code: ${product.code}
      \n Price: ${product.price}\n`
    })
    total = Math.round(total * 100) / 100;
    sendMailEthereal({
      from: process.env.MAIL,
      to: ["rudolph.wuckert6@ethereal.email", process.env.MAIL],
      subject: "Nuevo pedido",
      html: `<p>
      Pedido: <br/>
      Name: ${req.user.firstName} ${req.user.lastName}<br/>
      Email: ${req.user.email}<br/>
      Productos: <br/>
      ${products_mail}
      ---------------------------------
      <br/>
      Total pagado: ${total}
      </p>`,

    });
    const message = `Nuevo Pedido: \n
    Name: ${req.user.firstName} ${req.user.lastName}\n
    Email: ${req.user.email}\n
    Productos: \n
    ${products_wa}
    ---------------------------------\n
    Total pagado: ${total}`
    sendWP(req.user.phoneNumber, message);
    await carritoService.deleteCarrito(req.params.id)
    res.redirect("/index");
  } else {
    res.redirect("/login");
  }
})
app.get("/carrito", async (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    const carrito = await carritoService.getCarrito(user);
    const products = await carritoService.getProductsCarritoById(carrito._id);
    let total = 0;
    products.map((product) => total += product.price);
    total = Math.round(total * 100) / 100;

    res.render("carrito", {
      username: user.displayName,
      photo: user.photos[0].value,
      products,
      total,
      id_cart: carrito._id
    });
  } else {
    res.redirect("/login");
  }
})

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
