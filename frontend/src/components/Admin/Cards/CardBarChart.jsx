import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function CardBarChart({ stats }) {
  const data = {
    labels: ["Approved", "Rejected", "Pending"],
    datasets: [
      {
        label: "Status",
        data: [stats.approved, stats.rejected, stats.pending],
        backgroundColor: ["#48bb78", "#f56565", "#ecc94b"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Status Breakdown (Bar)" },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <Bar data={data} options={options} />
    </div>
  );
}
