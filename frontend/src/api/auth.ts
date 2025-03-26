import axios from "axios";

const API_URL = "https://port-0-project-harmonia-backend-m8o87jt5f6b3957f.sel4.cloudtype.app/api/auth";

export const registerUser = async (userData: any) => {
  return axios.post(`${API_URL}/signup`, userData);
};

export const loginUser = async (userData: any) => {
  return axios.post(`${API_URL}/login`, userData);
};