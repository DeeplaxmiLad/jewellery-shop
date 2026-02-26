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
<<<<<<< HEAD
  status: {
  type: String,
  default: "Order Placed"
}
=======
>>>>>>> 77bb0bba953c013e6022c84f1c623cf960851582
});

module.exports = mongoose.model("Order", orderSchema);