import axios from "axios";

const API = axios.create({
  baseURL: "https://jewellery-shop-1ru1.onrender.com/api",
});

export default API;