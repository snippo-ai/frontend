import axios from "axios";
import { isProduction } from "../config";

const axiosInstance = axios.create({
  baseURL: isProduction ? "" : "http://localhost:8080",
  timeout: 15000,
  headers: {
    ContentType: "application/json",
  },
  // withCredentials: true,
});

export default axiosInstance;
