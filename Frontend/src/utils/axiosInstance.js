import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development"
    ? "/"
    : "https://momentum-s326.onrender.com/";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
