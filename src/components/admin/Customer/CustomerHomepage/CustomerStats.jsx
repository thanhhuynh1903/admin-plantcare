import "./CustomerStats.scss";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { useState, useEffect } from "react";
import { formatNumber } from "../../../utils/util_string";

export default function CustomerStats({ customerData = [] }) {
  const [statsList, setStatsList] = useState(null);

  useEffect(() => {
    console.log(customerData)
    setStatsList([
      {
        label: "Total customers",
        value: customerData.length || 0,
        increase: customerData.totalCustomersIncrease || 1,
      },
      {
        label: "Premium users",
        value: customerData.filter((item) => item.rank == "Premium").length || 0,
        increase: 12,
      },
      {
        label: "New sign-ups",
        value: customerData.newSignUps || 21,
        increase: customerData.newSignUpsIncrease || 1,
      },
      {
        label: "Returning users",
        value: customerData.returningUsers || 0,
        increase: customerData.returningUsersIncrease || -1,
      },
    ]);
  }, [customerData]);

  return (
    <div className="customers-stats-list">
      {statsList &&
        statsList.map((item, index) => (
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
              <p className="node-value">{formatNumber(item.value)}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
