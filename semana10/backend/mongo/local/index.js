import express from "express";
import cors from "cors";
import emoji from "node-emoji";

import { carritoRouter, productRouter } from "../src/routers/index.js";
import "./db.js";
let isAdmin = false;

const app = express();
const port = 8081;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/productos", productRouter.router);
app.use("/carritos", carritoRouter.router);

app.post("/isAdmin", (req, res) => {
  isAdmin = !isAdmin;
  res.status(200).json({
    isAdmin,
  });
});
app.get("/isAdmin", (req, res) => {
  res.status(200).json({
    isAdmin,
  });
});
app.listen(port, () => {
  console.log(emoji.get("computer"), "Servidor Puerto: " + port);
});
