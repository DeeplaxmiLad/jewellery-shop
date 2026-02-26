const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: String,
  address: String,
  phone: String,
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: Number,
  status: {
    type: String,
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  status: {
  type: String,
  default: "Order Placed"
}

});

module.exports = mongoose.model("Order", orderSchema);