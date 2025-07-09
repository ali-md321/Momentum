// src/utils/axiosInstance.js (recommended)
import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development"
    ? "/api"
    : "https://momentum-s326.onrender.com/";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
