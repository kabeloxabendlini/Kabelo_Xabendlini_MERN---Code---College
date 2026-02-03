// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/auth", // backend base URL
  withCredentials: true, // if you ever use cookies
});

export default api;
