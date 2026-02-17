import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/Login.css";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      if (res.data.role === "admin") {
        login({ name: "Admin" }, "admin");
        navigate("/admin");
      } else {
        login(res.data.user, "customer");
        navigate("/");
      }
    } catch (error) {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2>Welcome Back</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="login-extra">
          Don’t have an account?{" "}
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;