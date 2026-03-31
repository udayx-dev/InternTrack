import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const STATUS_COLORS = {
  Applied:   "#6366f1",
  OA:        "#a855f7",
  Interview: "#f59e0b",
  Offer:     "#10b981",
  Rejected:  "#ef4444",
};

const PipelineChart = ({ byStatus = {} }) => {
  const entries = Object.entries(byStatus).filter(([, v]) => v > 0);

  if (entries.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-slate-400">
        No data yet
      </div>
    );
  }

  const data = {
    labels: entries.map(([k]) => k),
    datasets: [{
      data: entries.map(([, v]) => v),
      backgroundColor: entries.map(([k]) => STATUS_COLORS[k] || "#94a3b8"),
      borderWidth: 0,
      hoverOffset: 6,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "72%",
    plugins: {
      legend: {
        position: "bottom",
        labels: { font: { size: 11 }, padding: 12, usePointStyle: true },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};
export default PipelineChart;