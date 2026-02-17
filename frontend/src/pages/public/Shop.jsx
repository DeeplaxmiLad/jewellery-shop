import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import "../../styles/Shop.css";

function Shop() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ================= ADD TO CART =================
  const addToCart = (product) => {
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const alreadyInCart = existingCart.find(
      (item) => item._id === product._id
    );

    if (alreadyInCart) {
      alert("Product already in cart");
      return;
    }

    const updatedCart = [...existingCart, { ...product, quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Added to Cart");
  };

  // ================= ADD TO WISHLIST =================
  const toggleWishlist = (product) => {
    let updatedWishlist;

    const exists = wishlist.find((item) => item._id === product._id);

    if (exists) {
      updatedWishlist = wishlist.filter(
        (item) => item._id !== product._id
      );
    } else {
      updatedWishlist = [...wishlist, product];
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const isWishlisted = (id) => {
    return wishlist.some((item) => item._id === id);
  };

  return (
    <div className="shop">
      <h1>Our Collection</h1>

      <div className="shop-grid">
        {products.map((product) => (
          <div key={product._id} className="shop-card">

            {/* Wishlist Heart */}

            <img src={product.image} alt={product.name} />

            <div className="shop-card-content">
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>

              <button onClick={() => addToCart(product)}>
                Add to Cart
              </button>
              <button
                  className={`wishlist-btn ${
                    isWishlisted(product._id) ? "active" : ""
                  }`}
                  onClick={() => toggleWishlist(product)}
                >
                  {isWishlisted(product._id) ? "♥" : "♡"}
                </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;