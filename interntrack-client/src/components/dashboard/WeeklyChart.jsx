import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, Tooltip, Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const WeeklyChart = ({ weeklyActivity = [] }) => {
  // Build a full 7-day date map so missing days show 0
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().slice(0, 10);
  });

  const activityMap = Object.fromEntries(weeklyActivity.map((d) => [d._id, d.count]));
  const labels = last7.map((d) => new Date(d).toLocaleDateString("en-IN", { weekday: "short", day: "numeric" }));
  const values = last7.map((d) => activityMap[d] || 0);

  const data = {
    labels,
    datasets: [{
      label: "Applications added",
      data: values,
      backgroundColor: "rgba(99, 102, 241, 0.8)",
      borderRadius: 6,
      borderSkipped: false,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, font: { size: 11 } },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      x: { ticks: { font: { size: 11 } }, grid: { display: false } },
    },
  };

  return <Bar data={data} options={options} />;
};
export default WeeklyChart;