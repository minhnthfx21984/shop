const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  count: { type: Number },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
