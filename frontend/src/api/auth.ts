// src/api/auth.ts
import api from "./axios";

export const registerUser = async (userData: any) => {
  return api.post("/api/auth/signup", userData);
};

export const loginUser = async (userData: any) => {
  return api.post("/api/auth/login", userData);
};

export const getUserProfile = (token: string) => {
  return api.get("/api/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
