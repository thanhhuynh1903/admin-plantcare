import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import DownloadIcon from "@mui/icons-material/Download";
import "./MapsChartOrders.scss";
import Tabs from "../commons/Tabs/Tabs";
import { exportOrdersToExcel } from "../../utils/util_export";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

export default function MapsChartOrders() {
  const data = {
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "Orders",
        data: [10, 2, 5, 3, 6, 4, 8],
        fill: true,
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        borderColor: "rgba(76, 175, 80, 1)",
        borderWidth: 2,
        pointBackgroundColor: "white",
        pointBorderColor: "rgba(76, 175, 80, 1)",
        pointHoverBackgroundColor: "rgba(76, 175, 80, 1)",
        pointHoverBorderColor: "rgba(76, 175, 80, 1)",
        pointRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 100,
          color: "#888",
        },
      },
      x: {
        ticks: {
          color: "#888",
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw} Orders`,
        },
        backgroundColor: "white",
        borderColor: "rgba(76, 175, 80, 1)",
        borderWidth: 1,
        titleColor: "#000",
        bodyColor: "#000",
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  const TabArr = [
    { id: 0, name: "1d" },
    { id: 1, name: "7d" },
    { id: 2, name: "30d" },
    { id: 3, name: "Custom" },
  ];

  const [selTab, setSelTab] = useState(TabArr[0]);

  const handleChangeTab = (tab, newVal) => {
    setSelTab(TabArr[newVal]);
  };
  return (
    <div className="dashboard-maps-chart-orders">
      <div className="controls">
        <div className="controls-container">
          <p className="controls-label">Chart orders</p>
          <Tabs
            items={TabArr}
            index={selTab.id}
            handleChange={handleChangeTab}
          />
        </div>
        <div className="controls-btn-more">
          <button className="btn-more" onClick={() => {
            exportOrdersToExcel();
          }}>
            <DownloadIcon sx={{ marginTop: "3px" }} />
            <p>Save report</p>
          </button>
        </div>
      </div>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
