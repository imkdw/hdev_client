import axios, { AxiosInstance } from "axios";

let api: AxiosInstance;

if (process.env.NODE_ENV === "development") {
  api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
  });
} else {
  api = axios.create({
    baseURL: "https://api.hdev.site",
    withCredentials: true,
  });
}

export default api;
