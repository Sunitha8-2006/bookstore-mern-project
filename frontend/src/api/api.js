import axios from "axios";

const api = axios.create({
  baseURL: "https://bookstore-backend-n33a.onrender.com",
});

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("bookstore_user");
  if (stored) {
    const user = JSON.parse(stored);
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return config;
});

export default api;
