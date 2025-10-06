import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true, // send cookies in the request to server
});

export default axiosInstance;
