import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

// 👉 axios 전역 설정 (선택)
axios.defaults.baseURL = BASE_URL;
axios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 👉 토큰 붙이는 인터셉터
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default instance;