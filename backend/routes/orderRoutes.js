const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Place Order
router.post("/", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json(order);
});

// Get All Orders (Admin)
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// Update Status
router.put("/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(order);
});

// Delete Order
router.delete("/:id", async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "Order Deleted" });
});

module.exports = router;