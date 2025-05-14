import axios, { AxiosInstance } from "axios";
const instance : AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
})

export default instance;