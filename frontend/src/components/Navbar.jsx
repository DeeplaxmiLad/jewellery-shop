import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const updateCounts = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setCartCount(cart.length);
    setWishlistCount(wishlist.length);
  };

  useEffect(() => {
    updateCounts();
    window.addEventListener("storage", updateCounts);
    return () => window.removeEventListener("storage", updateCounts);
  }, []);

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="nav-logo">
        <Link to="/">ROYAL JEWELS</Link>
      </div>

      {/* Center Links */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/wishlist">
          Wishlist <span className="count">{wishlistCount}</span>
        </Link>
        <Link to="/cart">
          Cart <span className="count">{cartCount}</span>
        </Link>
      </div>

      {/* Right Section */}
      <div className="nav-right">
        <Link to="/login" className="login-btn">Login</Link>
        <Link to="/register" className="register-btn">Register</Link>
      </div>

    </nav>
  );
}

export default Navbar;