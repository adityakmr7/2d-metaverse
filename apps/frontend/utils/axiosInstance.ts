// src/utils/axiosInstance.ts
import axios from "axios";
import { BASE_URL } from "../config";

const axiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your API's base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
