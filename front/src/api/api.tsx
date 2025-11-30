import axios from "axios";
import { authService } from "../services/authService";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Add Access Token ---
api.interceptors.request.use((config) => {
  const access = authService.getAccess();
  if (access) config.headers.Authorization = `Bearer ${access}`;
  return config;
});

// --- Auto Refresh Token ---
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const refresh = authService.getRefresh();
        if (!refresh) throw new Error("No refresh token");

        // USE SAME BASEURL + USE api INSTEAD OF axios
        const { data } = await axios.post(
          "https://api.ithouseedu.uz/token/refresh/",
          { refresh },
          { headers: { "Content-Type": "application/json" } }
        );

        authService.saveAccess(data.access);

        original.headers.Authorization = `Bearer ${data.access}`;

        return api(original);
      } catch (err) {
        authService.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
