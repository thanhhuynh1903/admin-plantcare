import "./PlantersBudget.scss";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { useState, useEffect } from "react";
import { formatNumber } from "../../utils/util_string";
export default function PlantersBudget() {
  const [budgetList, setBudgetList] = useState(null);

  useEffect(() => {
    setBudgetList([
      {
        label: "Total budget",
        value: 10000,
        currency: "VND",
        increase: 1,
      },
      {
        label: "Monthly budget",
        value: 10000,
        currency: "VND",
        increase: 1,
      },
      {
        label: "Weekly budget",
        value: 1000,
        currency: "VND",
        increase: 1,
      },
      {
        label: "Daily budget",
        value: 100,
        currency: "VND",
        increase: -1,
      },
    ]);
  }, []);

  return (
    <div className="planters-budget">
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
