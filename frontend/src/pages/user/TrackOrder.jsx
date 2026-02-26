import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

const socket = io("https://your-render-backend-url");

function TrackOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();

    socket.on("orderUpdated", (updatedOrder) => {
      if (updatedOrder._id === id) {
        setOrder(updatedOrder);
      }
    });

    return () => socket.off("orderUpdated");
  }, []);

  const fetchOrder = async () => {
    const res = await axios.get(`/api/orders/${id}`);
    setOrder(res.data);
  };

  if (!order) return <p>Loading...</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h2>Delivery Tracking</h2>
      <h3>Status: {order.status}</h3>
    </div>
  );
}

export default TrackOrder;