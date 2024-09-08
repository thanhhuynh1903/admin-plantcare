import { useEffect, useState } from "react";
import "./MapsPieChart.scss";
import Tabs from "../commons/Tabs/Tabs";
import Checkbox from "../commons/Checkbox/Checkbox";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { MapsPieChartData } from "./MapsPieChart.prop";

// Register chart components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default function MapsPieChart() {
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
    <div className="dashboard-maps-pie-chart">
      <div className="controls">
        <div className="controls-container">
          <p className="controls-label">Pie chart</p>
          <Tabs
            items={TabArr}
            index={selTab.id}
            handleChange={handleChangeTab}
          />
          <Checkbox label={"Chart"} selectedColor={"#FF0000"} />
          <Checkbox label={"Show value"} selectedColor={"#FF0000"} />
        </div>
        <div className="controls-btn-more">
          <MoreVertIcon className="btn-more" />
        </div>
      </div>
      <div className="chart-container">
        <div className="chart">
          <Doughnut data={MapsPieChartData.data1} />
          <p>Total orders</p>
        </div>
        <div className="chart">
          <Doughnut data={MapsPieChartData.data2} />
          <p>Customers Growth</p>
        </div>
        <div className="chart">
          <Doughnut data={MapsPieChartData.data3} />
          <p>Total revenue</p>
        </div>
      </div>
    </div>
  );
}
