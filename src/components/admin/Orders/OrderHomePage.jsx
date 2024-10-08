import { Button } from "@mui/material";
import "./OrderHomePage.scss";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { useEffect, useState } from "react";
import { setPageHeadTitle } from "../../utils/util_web";
import { Sort } from "@mui/icons-material";
import OrderBudget from "./OrderBudget";
import { Link } from "react-router-dom";
import OrderList from "./OrderList";
import FilterOrder from "./FilterOrder";

import logo from "@assets/logo.png";

// const initialEmployeeData = [
//   { name: 'Darlene Robertson', email: 'trungkien.spktnd@gmail.com', status: 'Free', role: 'Reporter', avatar: logo },
//   { name: 'Devon Lane', email: 'tranthuy.nute@gmail.com', status: 'Busy', role: 'Bot Analyst', avatar: logo },
//   { name: 'Cody Fisher', email: 'tienlap.spktnd@gmail.com', status: 'Working', role: 'Sales Manager', avatar: logo },
//   { name: 'Theresa Webb', email: 'thuhang.nute@gmail.com', status: 'Free', role: 'Broadcaster', avatar: logo },
//   { name: 'Marvin McKinney', email: 'binhan628@gmail.com', status: 'Free', role: 'Team Editor', avatar: logo },
//   { name: 'Jerome Bell', email: 'nvt.isst.nute@gmail.com', status: 'Busy', role: 'Team Owner', avatar: logo },
//   { name: 'Eleanor Pena', email: 'vuhaithuong.nute@gmail.com', status: 'On Vacation', role: 'Analytics Admin', avatar: logo }
// ];

export default function OrderHomePage() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setPageHeadTitle("Orders");
    // setEmployees(initialEmployeeData);
  }, []);

  return (
    <div className="page-employees-home">
      <p className="main-label">Orders</p>
      <div className="tool-container">
        <div>
          <p className="text-result">{employees.length} results found</p>
        </div>
        <div className="tool-container-btn">
          {/* <Button className="btn-tool">
            <FilterAltOutlinedIcon />
          </Button> */}
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
      <div>
        <OrderBudget />
      </div>
      <div>
        <FilterOrder />
      </div>
       <div>
        <OrderList />
      </div>
    </div>
  );
}

