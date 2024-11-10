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
import { aget } from "../../utils/util_axios";

const StatisticItem = ({ icon, number, label, increase }) => (
  <div className="statistic-item">
    <div className="statistic-item-icon">{icon}</div>
    <div className="statistic-item-meta">
      <div className="statistic-item-number">{number}</div>
      <div className="statistic-item-label">{label}</div>
      <div className="statistic-item-increase">
        <div>
          {increase > 0 ? (
            <div className="statistic-item-increase-icon-i">
              <ArrowUpwardIcon />
            </div>
          ) : (
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

export default function DashboardPage() {
  const [userCount, setUserCount] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [cancelledOrders, setCancelledOrders] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    setPageHeadTitle("Dashboard");

    const fetchUsers = async () => {
      try {
        const users = await aget('/users');
        setUserCount(users.data.length);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    function getTopSaleItems(orders) {
      const productCount = {};
    
      orders.forEach((order) => {
        order.list_cart_item_id.forEach((cartItem) => {
          const product = cartItem.item_id.product;
          const productId = cartItem.item_id._id;
    
          if (!productCount[productId] || productCount[productId].name !== product.name) {
            productCount[productId] = {
              name: product?.name,
              price: product?.price,
              image: product?.img_url?.[0] || "",
              currency: "đ",
              count: 1,
            };
          } else {
            productCount[productId].count += 1;
          }
        });
      });
    
      const sortedProducts = Object.values(productCount).sort(
        (a, b) => b.count - a.count
      );
    
      setTopProducts(
        sortedProducts
          .reduce((uniqueProducts, product) => {
            if (!uniqueProducts.some((p) => p.name === product.name)) {
              return [...uniqueProducts, product];
            }
            return uniqueProducts;
          }, [])
          .slice(0, 5)
      );
    }

    const fetchOrders = async () => {
      try {
        const orders = await aget('/orders/admin');

        setTotalOrders(orders.data.length);
        const delivered = orders.data.filter(order => order.status == "Delivered");
        setDeliveredOrders(delivered.length);

        const cancelled = orders.data.filter(order => order.status == "Cancelled");
        setCancelledOrders(cancelled.length);

        let total = 0;
        for (const order of orders.data) {
          total += order.total_price;
        }
        setTotalPrice(total);

        getTopSaleItems(orders.data);

      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchUsers();
    fetchOrders();
  }, []);

  return (
    <div className="page-dashboard">
      <p className="main-label">Dashboard</p>
      <div className="statistic">
        <div className="statistic-row">
          <StatisticItem
            icon={<PeopleIcon />}
            number={userCount}
            label="Total users"
            increase={10}
          />
          <StatisticItem
            icon={<DownloadForOfflineIcon />}
            number={formatNumber(126)}
            label="Total installations"
            increase={10}
          />
          <StatisticItem
            icon={<GradeIcon />}
            number={formatNumber(4.5)}
            label="Total app ratings"
            increase={10}
          />
        </div>
        <div className="statistic-row">
          <StatisticItem
            icon={<img src={TotalOrders} alt="TotalOrders" />}
            number={formatNumber(totalOrders)}
            label="Total orders"
            increase={10}
          />
          <StatisticItem
            icon={<img src={TotalDelivered} alt="TotalDelivered" />}
            number={formatNumber(deliveredOrders)}
            label="Total delivered"
            increase={10}
          />
          <StatisticItem
            icon={<img src={TotalCancelled} alt="TotalCancelled" />}
            number={formatNumber(cancelledOrders)}
            label="Total cancelled"
            increase={10}
          />
          <StatisticItem
            icon={<img src={TotalRevenue} alt="TotalRevenue" />}
            number={`${formatNumber(totalPrice)}đ`} 
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
          <MapsTopSaleProduct topSaleItems={topProducts} />
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
