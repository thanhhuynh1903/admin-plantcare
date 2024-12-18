import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import DownloadIcon from "@mui/icons-material/Download";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip } from "chart.js";
import Tabs from "../commons/Tabs/Tabs";
import "./MapsSales.scss";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip);

export default function MapsSales() {

  const TabArr = [
    { id: 0, name: "1d" },
    { id: 1, name: "7d" },
    { id: 2, name: "30d" },
    { id: 3, name: "Custom" },
  ];

  const [selTab, setSelTab] = useState(TabArr[3]);

  const handleChangeTab = (tab, newVal) => {
    setSelTab(TabArr[newVal]);
  };

  const data = {
    labels: ["Jun 2024", "Jul 2024", "Aug 2024", "Sep 2024", "Oct 2024", "Nov 2024", "Dec 2024"],
    datasets: [
      {
        label: "Sales Percentage",
        data: [0, 0, 0, 0, 45, 55, 0],
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw.toFixed(2)}%`;
          },
        },
      },
    },
  };

  return (
    <div className="dashboard-maps-sales">
      <div className="controls">
        <div className="controls-container">
          <p className="controls-label">Sales graph</p>
          <Tabs items={TabArr} index={selTab.id} handleChange={handleChangeTab} />
        </div>
        <div className="controls-btn-more">
          <button className="btn-more">
            <DownloadIcon sx={{ marginTop: "3px" }} />
            <p>Save report</p>
          </button>
        </div>
      </div>
      <div className="chart-container">
        <Line data={data} options={options} height={'85%'} />
      </div>
    </div>
  );
}
