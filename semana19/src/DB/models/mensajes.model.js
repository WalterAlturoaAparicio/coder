import mongoose from "mongoose";
export const author = mongoose.Schema({
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

export const Schema = mongoose.Schema({
  text: {
    type: String,
    required: true,
    max: 100,
  },
  author: {
    type: author,
    required: true,
  },
  date: {
    type: String,
    require: true
  }
});

export default mongoose.model("mensajes", Schema);
