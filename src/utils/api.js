import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:8080/api/v1";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const api = axios.create({
  baseURL,
  headers,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
