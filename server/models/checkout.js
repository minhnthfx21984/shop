const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String },
  address: { type: String },
  phone: { type: String },
  cartList: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      count: { type: Number },
    },
  ],
  totalPrice: { type: String },
  email: { type: String },
});

const Checkout = mongoose.model("Checkout", checkoutSchema);

module.exports = Checkout;
