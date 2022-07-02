import axios, { AxiosInstance } from "axios";
import config from "../config";

const apiClient: AxiosInstance = axios.create({
  baseURL: config.api_base_url,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
