import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000/api",
  withCredentials: true, // ← cookie automatically jayegi
});

export default api;
