import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Home.css";

function Home() {
  return (
    <div className="home">

      {/* ================= HERO SECTION ================= */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Elegance In Every Detail</h1>
          <p>Luxury jewellery crafted to celebrate timeless moments.</p>
          <Link to="/shop">
            <button className="hero-btn">Explore Collection</button>
          </Link>
        </div>
      </section>

      {/* ================= FEATURED SECTION ================= */}
      <section className="featured">
        <h2>Featured Categories</h2>

        <div className="featured-grid">
          <Link to="/shop" className="featured-card">
            <img
              src="https://images.unsplash.com/photo-1603561596112-0a132b757442"
              alt="Rings"
            />
            <h3>Rings</h3>
          </Link>

          <Link to="/shop" className="featured-card">
            <img
              src="https://images.unsplash.com/photo-1611599538437-3f38b1a49e6c"
              alt="Necklaces"
            />
            <h3>Necklaces</h3>
          </Link>

          <Link to="/shop" className="featured-card">
            <img
              src="https://images.unsplash.com/photo-1617038220319-276d3cfab638"
              alt="Bracelets"
            />
            <h3>Bracelets</h3>
          </Link>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="why-us">
        <h2>Why Choose Royal Jewels</h2>

        <div className="why-grid">
          <div className="why-card">
            <h3>Premium Quality</h3>
            <p>Only the finest materials crafted with precision.</p>
          </div>

          <div className="why-card">
            <h3>Trusted Brand</h3>
            <p>Thousands of satisfied customers across India.</p>
          </div>

          <div className="why-card">
            <h3>Secure Shopping</h3>
            <p>Safe checkout and trusted order processing.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;