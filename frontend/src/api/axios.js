import axios from "axios";

const API = axios.create({
  baseURL: "https://jewellery-shop-wvvh.onrender.com",
});

export default API;