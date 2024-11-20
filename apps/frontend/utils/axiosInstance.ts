// src/utils/axiosInstance.ts
import axios from "axios";
import { BASE_URL } from "../config";

const getAuthToken = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

const authToken = getAuthToken();
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your API's base URL
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  },
});

export default axiosInstance;
