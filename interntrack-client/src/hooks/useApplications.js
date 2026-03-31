import { useState, useEffect, useCallback } from "react";
import { applicationApi } from "../api/application.api";
import toast from "react-hot-toast";

export const useApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await applicationApi.getAll();
      setApplications(data.applications);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchApplications(); }, [fetchApplications]);

  const createApplication = async (formData) => {
    const { data } = await applicationApi.create(formData);
    setApplications((prev) => [data.application, ...prev]);
    return data.application;
  };

  const updateApplication = async (id, formData) => {
    const { data } = await applicationApi.update(id, formData);
    setApplications((prev) =>
      prev.map((app) => (app._id === id ? data.application : app))
    );
    return data.application;
  };

  const updateStatus = async (id, status) => {
    // Optimistic update — update UI instantly, roll back on failure
    const prev = applications.find((a) => a._id === id);
    setApplications((apps) =>
      apps.map((a) => (a._id === id ? { ...a, status } : a))
    );
    try {
      await applicationApi.updateStatus(id, status);
    } catch (err) {
      // Roll back
      setApplications((apps) =>
        apps.map((a) => (a._id === id ? prev : a))
      );
      toast.error("Failed to update status");
    }
  };

  const deleteApplication = async (id) => {
    await applicationApi.delete(id);
    setApplications((prev) => prev.filter((a) => a._id !== id));
  };

  return {
    applications,
    loading,
    fetchApplications,
    createApplication,
    updateApplication,
    updateStatus,
    deleteApplication,
  };
};