import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PaymentMethod() {
  const [method, setMethod] = useState("COD");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("paymentMethod", method);
    navigate("/checkout");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Select Payment Method</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="radio"
            value="COD"
            checked={method === "COD"}
            onChange={(e) => setMethod(e.target.value)}
          />
          Cash On Delivery
        </div>

        <div>
          <input
            type="radio"
            value="UPI"
            checked={method === "UPI"}
            onChange={(e) => setMethod(e.target.value)}
          />
          UPI
        </div>

        <div>
          <input
            type="radio"
            value="Card"
            checked={method === "Card"}
            onChange={(e) => setMethod(e.target.value)}
          />
          Credit/Debit Card
        </div>

        <button type="submit">Continue</button>
      </form>
    </div>
  );
}

export default PaymentMethod;