import { useState, useEffect } from "react";
import { applicationApi } from "../api/application.api";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import WeeklyChart from "../components/dashboard/WeeklyChart";
import PipelineChart from "../components/dashboard/PipelineChart";
import StatusBadge from "../components/common/StatusBadge";
import Spinner from "../components/common/Spinner";
import { formatDate, daysUntil } from "../utils/formatters";
import toast from "react-hot-toast";

const StatCard = ({ label, value, sub, accent }) => (
  <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-1">
    <p className="text-xs text-slate-500 font-medium">{label}</p>
    <p className={`text-3xl font-bold ${accent || "text-slate-900"}`}>{value}</p>
    {sub && <p className="text-xs text-slate-400">{sub}</p>}
  </div>
);

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    applicationApi.getStats()
      .then(({ data }) => setStats(data.stats))
      .catch(() => toast.error("Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  const activeCount = (stats?.byStatus?.Applied || 0) + (stats?.byStatus?.OA || 0) + (stats?.byStatus?.Interview || 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Hey, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-slate-500 text-sm mt-1">Here's your job hunt overview</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Applications" value={stats?.total || 0} sub="All time" />
        <StatCard label="Active" value={activeCount} sub="In pipeline" accent="text-indigo-600" />
        <StatCard label="Offers" value={stats?.byStatus?.Offer || 0} sub="Congratulations!" accent="text-green-600" />
        <StatCard label="Offer Rate" value={`${stats?.offerRate || 0}%`} sub="Of all applications" accent={stats?.offerRate > 10 ? "text-green-600" : "text-slate-900"} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Applications this week</h2>
          <div className="h-48">
            <WeeklyChart weeklyActivity={stats?.weeklyActivity || []} />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Pipeline status</h2>
          <div className="h-48">
            <PipelineChart byStatus={stats?.byStatus || {}} />
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      {stats?.upcomingDeadlines?.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">⏰ Upcoming Deadlines</h2>
          <div className="space-y-3">
            {stats.upcomingDeadlines.map((app) => {
              const days = daysUntil(app.deadline);
              return (
                <div key={app._id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{app.company} — {app.role}</p>
                    <p className="text-xs text-slate-400">{formatDate(app.deadline)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={app.status} />
                    <span className={`text-xs font-medium ${days <= 1 ? "text-red-500" : days <= 3 ? "text-orange-500" : "text-slate-500"}`}>
                      {days === 0 ? "Today" : days === 1 ? "Tomorrow" : `${days}d left`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Link */}
      <div className="flex justify-center">
        <button onClick={() => navigate("/kanban")}
          className="text-sm text-indigo-600 font-medium hover:underline">
          Open Pipeline Board →
        </button>
      </div>
    </div>
  );
};
export default DashboardPage;