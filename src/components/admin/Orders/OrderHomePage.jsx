import { Button } from "@mui/material";
import "./OrderHomePage.scss";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useEffect, useState } from "react";
import { setPageHeadTitle } from "../../utils/util_web";
import OrderBudget from "./OrderBudget";
import { Link } from "react-router-dom";
import OrderList from "./OrderList";
import FilterOrder from "./FilterOrder";
import { aget } from "@utils/util_axios";
import LoadingIcon from "@commons/LoadingIcon/LoadingIcon";

export default function OrderHomePage() {
  const [orders, setOrders] = useState([]);
  const [filterType, setFilterType] = useState(1);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const filterTypes = [
    { id: 1, name: "All" },
    { id: 2, name: "Delivered" },
    { id: 3, name: "Confirmed" },
    { id: 4, name: "Failed Delivery" },
  ];

  const handleListOrderAPI = async () => {
    setIsLoading(true);
    aget(`/orders/admin`).then((res) => {
      if (res.status === 200) {
        setOrders(res.data);
        setFilteredOrders(res.data);
      }
      setIsLoading(false);
    });
  };

  const applyFilter = (type) => {
    setFilterType(type);
    if (type === 1) {
      setFilteredOrders(orders);
      return;
    }
    let filterName = filterTypes.find((item) => item.id === type).name;
    setFilteredOrders(orders.filter((item) => item.status === filterName));
  };

  useEffect(() => {
    setPageHeadTitle("Orders");

    handleListOrderAPI();
  }, []);

  return (
    <div className="page-orders-home">
      <p className="main-label">Orders</p>
      <div className="tool-container">
        <div>
          <p className="text-result">{orders.length} results found</p>
        </div>
        <div className="tool-container-btn">
          <Button className="btn-tool">
            <SortOutlinedIcon />
            <p>Sort: Chronological</p>
          </Button>
          <div className="btn-tool">
            <Button className="btn-tool-nav">
              <KeyboardArrowLeftOutlinedIcon />
            </Button>
            <p>August 2021</p>
            <Button className="btn-tool-nav">
              <KeyboardArrowRightOutlinedIcon />
            </Button>
          </div>
        </div>
      </div>
      {!isLoading ? (
        <>
          <div>
            <OrderBudget />
          </div>
          <div>
            <FilterOrder
              filteredOrders={filteredOrders}
              filterType={filterType}
              filterTypes={filterTypes}
              applyFilter={applyFilter}
            />
          </div>
          <div>
            <OrderList
              orders={filteredOrders}
              onFinishDeleting={handleListOrderAPI}
            />
          </div>
        </>
      ) : (
        <LoadingIcon />
      )}
    </div>
  );
}
