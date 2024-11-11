import "./OrderBudget.scss";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { useState, useEffect } from "react";
import { formatNumber } from "../../utils/util_string";
export default function OrderBudget({orders = []}) {
  const [budgetList, setBudgetList] = useState(null);

  useEffect(() => {

    setBudgetList([
      {
        label: "Total budget",
        value: orders ? orders.reduce((total, order) => total + order.total_price, 0) : 0,
        currency: "VND",
        increase: 1,
      },
      {
        label: "Monthly budget",
        value: orders ? orders.filter(order => new Date(order.createdAt).getMonth() === new Date().getMonth()).reduce((total, order) => total + order.total_price, 0) : 0,
        currency: "VND",
        increase: 1,
      },
      {
        label: "Weekly budget",
        value: orders ? orders.filter(order => {
          const orderDate = new Date(order.createdAt);
          const currentDate = new Date();
          const oneWeekAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));
          return orderDate >= oneWeekAgo;
        }).reduce((total, order) => total + order.total_price, 0) : 0,
        currency: "VND",
        increase: 1,
      },
      {
        label: "Daily budget",
        value: orders ? orders.filter(order => {
          const orderDate = new Date(order.createdAt);
          const currentDate = new Date();
          const oneDayAgo = new Date(currentDate.setDate(currentDate.getDate() - 1));
          return orderDate >= oneDayAgo;
        }).reduce((total, order) => total + order.total_price, 0) : 100,
        currency: "VND",
        increase: -1,
      },
    ]);
  }, [orders]);

  return (
    <div className="employees-home-budget-list">
      {budgetList &&
        budgetList.map((item, index) => (
          <div className="node" key={index}>
            <div className="node-label-container">
              <p className="node-label">{item.label}</p>
              {item.increase > 0 && (
                <ArrowDropUpOutlinedIcon className="node-icon-increase" />
              )}
              {item.increase < 0 && (
                <ArrowDropDownOutlinedIcon className="node-icon-decrease" />
              )}
            </div>
            <div className="node-value-container">
              <p className="node-currency">{item.currency}</p>
              <p className="node-value">{formatNumber(item.value)}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
