import axios from "axios";

const API_URL = "http://localhost:8094/api/auth";

export const registerUser = async (userData: any) => {
  return axios.post(`${API_URL}/signup`, userData);  // ✅ URL 확인
};

export const loginUser = async (userData: any) => {
    return axios.post(`${API_URL}/login`, userData);
};
