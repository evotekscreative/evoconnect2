import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrasi chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function CardLineChart({ stats }) {
  // Ambil data dari props
  const data = {
    labels: ["Total", "Approved", "Rejected", "Pending"],
    datasets: [
      {
        label: "Submissions",
        data: [
          stats.totalSubmissions,
          stats.approved,
          stats.rejected,
          stats.pending,
        ],
        borderColor: "#4c51bf",
        backgroundColor: "#4c51bf",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Submissions Overview (Line)" },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <Line data={data} options={options} />
    </div>
  );
}
