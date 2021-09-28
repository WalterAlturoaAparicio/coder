import mongoose from "mongoose";
const author = mongoose.Schema({
  id: {
    type: String,
  },
  nombre: {
    type: String,
  },
  apellido: {
    type: String,
  },
  edad: {
    type: Number,
  },
  alias: {
    type: String,
  },
  avatar: {
    type: String,
  },
});

const Schema = mongoose.Schema({
  text: {
    type: String,
    required: true,
    max: 100,
  },
  author: {
    type: author,
    required: true,
  },
});

export default mongoose.model("mensajes", Schema);
