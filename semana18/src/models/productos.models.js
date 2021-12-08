import mongoose from "mongoose";

const Schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    max: 100,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  code: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
  }
});

export default mongoose.model("productos", Schema);
