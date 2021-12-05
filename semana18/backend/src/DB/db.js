import dotenv from "dotenv";
import mongoose from "mongoose";
import emoji from "node-emoji";

dotenv.config();

mongoose.connect(
  process.env.MONGOCLOUD,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log(err);
    else console.log(emoji.get("avocado"), "Conectado a la base de datos");
  }
);

export default mongoose;
