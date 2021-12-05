import mongoose from "mongoose";

const Schema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  products: [
    {
      ref: "productos",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  user: {
    ref: "users",
    type: mongoose.Schema.Types.ObjectId,
  }

});

export default mongoose.model("carritos", Schema);
