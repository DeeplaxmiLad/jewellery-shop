import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import "../../styles/AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}`, { status });
      fetchOrders();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await API.delete(`/orders/${id}`);
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="admin-orders">
      <h1>Customer Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <div className="order-header">
            <h3>{order.customerName}</h3>

            {/* STATUS DROPDOWN */}
            <select
              value={order.status}
              onChange={(e) =>
                updateStatus(order._id, e.target.value)
              }
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packed">Packed</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">
                Out for Delivery
              </option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <p><strong>Phone:</strong> {order.phone}</p>
          <p><strong>Address:</strong> {order.address}</p>

          <div className="order-items">
            {order.items.map((item, index) => (
              <div key={index}>
                {item.name} × {item.quantity} — ₹{item.price}
              </div>
            ))}
          </div>

          <h4>Total: ₹{order.totalAmount}</h4>

          <div className="order-actions">
            <button
              onClick={() =>
                updateStatus(order._id, "Shipped")
              }
            >
              Mark Shipped
            </button>

            <button
              onClick={() =>
                updateStatus(order._id, "Delivered")
              }
            >
              Mark Delivered
            </button>

            <button
              onClick={() => deleteOrder(order._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;