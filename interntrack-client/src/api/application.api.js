import axiosInstance from "./axiosInstance";

export const applicationApi = {
  getAll: (params = {}) => axiosInstance.get("/applications", { params }),
  getById: (id) => axiosInstance.get(`/applications/${id}`),
  create: (data) => axiosInstance.post("/applications", data),
  update: (id, data) => axiosInstance.put(`/applications/${id}`, data),
  updateStatus: (id, status) => axiosInstance.patch(`/applications/${id}/status`, { status }),
  delete: (id) => axiosInstance.delete(`/applications/${id}`),
  getStats: () => axiosInstance.get("/applications/stats/summary"),
};