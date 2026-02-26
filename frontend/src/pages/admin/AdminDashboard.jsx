import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import "../../styles/AdminDashboard.css";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= ADD / UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/products/${editingId}`, form);
        setEditingId(null);
      } else {
        await API.post("/products", form);
      }

      setForm({
        name: "",
        price: "",
        image: "",
        description: "",
      });

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= EDIT =================
  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product._id);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* ===== VIEW ORDERS BUTTON ===== */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <Link to="/admin/orders">
          <button className="admin-orders-btn">
            View Orders
          </button>
        </Link>
      </div>

      {/* ================= FORM ================= */}
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* ================= PRODUCT LIST ================= */}
      <div className="admin-products">
        {products.map((product) => (
          <div key={product._id} className="admin-card">
            <img src={product.image} alt={product.name} />

            <h3>{product.name}</h3>
            <p>₹{product.price}</p>

            <div className="admin-buttons">
              <button onClick={() => handleEdit(product)}>
                Edit
              </button>
              <button onClick={() => handleDelete(product._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;