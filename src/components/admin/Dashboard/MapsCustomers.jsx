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
  plugins,
} from "chart.js";
import "./MapsCustomers.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function MapsCustomers() {
  const data = {
    labels: ["1/6", "7/6", "14/6", "21/6", "28/6", "30/6"],
    datasets: [
      {
        label: "New Customers",
        data: [100, 200, 300, 400, 500, 600],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        fill: true,
      },
      {
        label: "Returning Customers",
        data: [300, 250, 400, 150, 350, 500],
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        borderColor: "rgba(153, 102, 255, 1)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  return (
    <div className="dashboard-maps-customers">
      <div className="controls">
        <div className="controls-container">
          <p className="controls-label">Customers</p>
          <p className="controls-subtitle">Last 30 days</p>
        </div>
        <div className="controls-btn-more">
          <MoreVertIcon className="btn-more" />
        </div>
      </div>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
      <div className="stats">
        <div className="stat-item">
          <div className="dot-container">
            <div className="dot stat-item-new-customers"></div>
          </div>
          <div className="stat-item-meta">
            <p className="stat-item-number">1200</p>
            <p className="stat-item-label">New Customers</p>
          </div>
        </div>
        <div className="stat-item">
          <div className="dot-container">
            <div className="dot stat-item-returning-customers"></div>
          </div>
          <div className="stat-item-meta">
            <p className="stat-item-number">800</p>
            <p className="stat-item-label">Returning Customers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
