import mongoose from "mongoose";
const Schema = mongoose.Schema({
  products: [
    {
      ref: "productos",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  user: {
    ref: "users",
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  //createdAt: { type: Date, expires: 120 }
}, { timestamps: true }
);
export default mongoose.model("carritos", Schema);
