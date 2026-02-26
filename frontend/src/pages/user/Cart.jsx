import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // ================= UPDATE LOCAL STORAGE =================
  const updateCartStorage = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ================= REMOVE ITEM =================
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    updateCartStorage(updatedCart);
  };

  // ================= INCREASE QUANTITY =================
  const increaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    updateCartStorage(updatedCart);
  };

  // ================= DECREASE QUANTITY =================
  const decreaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCartStorage(updatedCart);
  };

  // ================= TOTAL =================
  const total = cart.reduce((acc, item) => {
    const numericPrice = Number(
      item.price.toString().replace(/[₹,]/g, "")
    );
    return acc + numericPrice * (item.quantity || 1);
  }, 0);

  return (
    <div className="cart">
      <h1>Your Cart</h1>

      {cart.length === 0 && (
        <p className="cart-empty">Cart is empty</p>
      )}

      {cart.map((item) => (
        <div key={item._id} className="cart-item">
          <img src={item.image} alt={item.name} />

          <div className="cart-details">
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

            {/* Quantity Controls */}
            <div className="quantity-controls">
              <button
                onClick={() => decreaseQty(item._id)}
                disabled={item.quantity === 1}
              >
                −
              </button>

              <span>{item.quantity || 1}</span>

              <button onClick={() => increaseQty(item._id)}>
                +
              </button>
            </div>

            <button
              className="remove-btn"
              onClick={() => removeItem(item._id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="cart-total">
          <h2>Total: ₹{total.toLocaleString("en-IN")}</h2>
          <button
            className="checkout-btn"
<<<<<<< HEAD
            onClick={() => navigate("/payment")}
          >
            Proceed to Payment
=======
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
>>>>>>> 77bb0bba953c013e6022c84f1c623cf960851582
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;