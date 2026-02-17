import React, { useState } from "react";
import API from "../../api/axios";
import "../../styles/Checkout.css";

function Checkout() {
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
  });

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // ================= CORRECT TOTAL CALCULATION =================
  const totalAmount = cart.reduce((acc, item) => {
    const numericPrice = Number(
      item.price.toString().replace(/[₹,]/g, "")
    );
    return acc + numericPrice * (item.quantity || 1);
  }, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      await API.post("/orders", {
        ...form,
        items: cart,
        totalAmount,
      });

      localStorage.removeItem("cart");
      alert("Order Placed Successfully!");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="checkout">
      <div className="checkout-container">
        <h1>Checkout</h1>

        <form className="checkout-form" onSubmit={placeOrder}>
          <input
            type="text"
            name="customerName"
            placeholder="Full Name"
            value={form.customerName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <textarea
            name="address"
            placeholder="Full Address"
            rows="4"
            value={form.address}
            onChange={handleChange}
            required
          />

          {/* ================= ORDER SUMMARY ================= */}
          <div className="order-summary">
            <h3>Order Summary</h3>

            {cart.map((item) => (
              <p key={item._id}>
                {item.name} × {item.quantity || 1}
              </p>
            ))}

            <p className="total">
              Total: ₹{totalAmount.toLocaleString("en-IN")}
            </p>
          </div>

          <button type="submit" className="checkout-btn">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;