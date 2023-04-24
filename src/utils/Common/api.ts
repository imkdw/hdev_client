import axios, { AxiosInstance } from "axios";

let api: AxiosInstance;

if (process.env.NODE_ENV === "development") {
  api = axios.create({
    baseURL: "http://dongeu47.iptime.org:5000",
    withCredentials: true,
  });
} else {
  api = axios.create({
    baseURL: "https://api.hdev.site:5000",
    withCredentials: true,
  });
}

export default api;
