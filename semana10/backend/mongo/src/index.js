import express from "express";
import cors from "cors";
import emoji from "node-emoji";

import { productRouter } from './routers/index.js'
import "./src/db.js";
let isAdmin = false;

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/productos', productRouter.router)

app.post("/isAdmin", (req, res) => {
  isAdmin = !isAdmin;
  res.status(200).json({
    isAdmin
  });
});
app.get("/isAdmin", (req, res)=>{
    res.status(200).json({
      isAdmin
    })
})
app.listen(port, () => {
  console.log(emoji.get("computer"), "Servidor Puerto: " + port);
});
