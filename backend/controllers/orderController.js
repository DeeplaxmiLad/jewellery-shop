const Order = require("../models/Order");

// ================= PLACE ORDER =================
exports.placeOrder = async (req, res) => {
  try {
    const { user, products } = req.body;

    const order = new Order({
      user,
      products,
    });

    await order.save();

    res.status(201).json({
      message: "Order Placed Successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================= GET ALL ORDERS =================
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};