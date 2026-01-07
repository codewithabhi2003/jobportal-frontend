import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jobportal-backend-navy.vercel.app/api/v1",
  withCredentials: true, // ✅ always send cookies
});

export default axiosInstance;
