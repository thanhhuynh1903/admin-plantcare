import { useEffect, useState } from "react";
import "./DashboardPage.scss";
import { setPageHeadTitle } from "../../utils/util_web";
import { formatNumber } from "../../utils/util_string";

import PeopleIcon from "@mui/icons-material/People";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import GradeIcon from "@mui/icons-material/Grade";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MapsPieChart from "./MapsPieChart";
import MapsTopSaleProduct from "./MapsTopSaleProduct";
import MapsChartOrders from "./MapsChartOrders";
import MapsCustomers from "./MapsCustomers";
import MapsSales from "./MapsSales";

import TotalOrders from '@assets/pages/Dashboard/TotalOrders.png';
import TotalDelivered from '@assets/pages/Dashboard/TotalDelivered.png';
import TotalCancelled from '@assets/pages/Dashboard/TotalCancelled.png';
import TotalRevenue from '@assets/pages/Dashboard/TotalRevenue.png';

const StatisticItem = ({ icon, number, label, increase }) => {
  return (
    <div className="statistic-item">
      <div className="statistic-item-icon">{icon}</div>
      <div className="statistic-item-meta">
        <div className="statistic-item-number">{number}</div>
        <div className="statistic-item-label">{label}</div>
        <div className="statistic-item-increase">
          <div>
            {increase > 0 && (
              <div className="statistic-item-increase-icon-i">
                <ArrowUpwardIcon />
              </div>
            )}
            {increase < 0 && (
              <div className="statistic-item-increase-icon-d">
                <ArrowDownwardIcon />
              </div>
            )}
          </div>
          <div>{increase} (last 30 days)</div>
        </div>
      </div>
    </div>
  );
};

const MapTopSaleProduct = () => {
  return (
    <div className="map-top-sale-product">
      <p>Soon</p>
    </div>
  );
};

export default function DashboardPage() {
  useEffect(() => {
    setPageHeadTitle("Dashboard");
  }, []);

  return (
    <div className="page-dashboard">
      <p className="main-label">Dashboard</p>
      <div className="statistic">
        <div className="statistic-row">
          <StatisticItem
            icon={<PeopleIcon />}
            number={100}
            label="Total users"
            increase={10}
          />
          <StatisticItem
            icon={<DownloadForOfflineIcon />}
            number={formatNumber(100)}
            label="Total installations"
            increase={10}
          />
          <StatisticItem
            icon={<GradeIcon />}
            number={formatNumber(100)}
            label="Total app ratings"
            increase={10}
          />
        </div>
        <div className="statistic-row">
          <StatisticItem
            icon={<img src={TotalOrders} alt="TotalOrders" />}
            number={formatNumber(100)}
            label="Total orders"
            increase={10}
          />
          <StatisticItem
            icon={<img src={TotalDelivered} alt="TotalDelivered" />}
            number={formatNumber(100)}
            label="Total delivered"
            increase={10}
          />
          <StatisticItem
            icon={<img src={TotalCancelled} alt="TotalCancelled" />}
            number={formatNumber(100)}
            label="Total cancelled"
            increase={10}
          />
          <StatisticItem
            icon={<img src={TotalRevenue} alt="TotalRevenue" />}
            number={`${formatNumber(1000000)}đ`}
            label="Total revenue (VND)"
            increase={10}
          />
        </div>
      </div>
      <div className="maps">
        <p className="main-label">Maps</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.7fr 0.3fr",
            gap: "15px",
            marginTop: "15px",
          }}
        >
          <MapsPieChart />
          <MapsTopSaleProduct />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.7fr 0.3fr",
            gap: "15px",
            marginTop: "15px",
          }}
        >
          <MapsChartOrders />
          <MapsCustomers />
        </div>
        <div>
          <MapsSales />
        </div>
      </div>
    </div>
  );
}

