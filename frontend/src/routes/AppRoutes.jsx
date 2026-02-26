import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import Shop from "../pages/public/Shop";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AdminRoute from "../components/AdminRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Navbar from "../components/Navbar";
import AdminOrders from "../pages/admin/AdminOrders";
import Wishlist from "../pages/user/Wishlist";
import Cart from "../pages/user/Cart";
import Checkout from "../pages/user/Checkout";
import PaymentMethod from "../pages/user/PaymentMethod";
import TrackOrder from "../pages/user/TrackOrder";


function AppRoutes() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/payment" element={<PaymentMethod />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/track/:id" element={<TrackOrder />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default AppRoutes;