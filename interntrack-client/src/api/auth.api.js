import axiosInstance from "./axiosInstance";

export const authApi = {
  signup: (data) => axiosInstance.post("/auth/signup", data),
  login: (data) => axiosInstance.post("/auth/login", data),
  logout: () => axiosInstance.post("/auth/logout"),
  refresh: () => axiosInstance.post("/auth/refresh"),
  getMe: () => axiosInstance.get("/auth/me"),
};