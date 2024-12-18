import { plugins } from "chart.js";

export const MapsPieChartData = {
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
  },
  data1: {
    percentage: 80,
    labels: ["Orders", "None"],
    datasets: [
      {
        label: "Total orders",
        data: [80, 20],
        backgroundColor: ["#F95959", "#FFE6E6"],
        borderColor: "#fff",
        borderWidth: 1,
        width: 10,
        height: 10,
      },
    ],
  },

  data2: {
    percentage: 20,
    labels: ["Customers", "None"],
    legend: {
      maxWidth: 100,
    },
    datasets: [
      {
        label: "Customers",
        data: [20, 80],
        backgroundColor: ["#00B074", "#D9F3EA"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  },

  data3: {
    percentage: 60,
    labels: ["Revenue", "None"],
    datasets: [
      {
        label: "Total revenue",
        data: [60, 40],
        backgroundColor: ["#2D9CDA", "#E0F0FA"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  },
};
