import { Button } from "@mui/material";
import "./EmployeesHomePage.scss";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { useEffect, useState } from "react";
import { setPageHeadTitle } from "../../../utils/util_web";
import { Sort } from "@mui/icons-material";
import BudgetList from "./BudgetList";
import EmployeeList from "./EmployeeList";
import { Link } from "react-router-dom";

const initialEmployeeData = [
  { name: 'Darlene Robertson', email: 'trungkien.spktnd@gmail.com', status: 'Free', role: 'Reporter', avatar: '/src/assets/avatar.jpg' },
  { name: 'Devon Lane', email: 'tranthuy.nute@gmail.com', status: 'Busy', role: 'Bot Analyst', avatar: 'link_to_avatar' },
  { name: 'Cody Fisher', email: 'tienlap.spktnd@gmail.com', status: 'Working', role: 'Sales Manager', avatar: 'link_to_avatar' },
  { name: 'Theresa Webb', email: 'thuhang.nute@gmail.com', status: 'Free', role: 'Broadcaster', avatar: 'link_to_avatar' },
  { name: 'Marvin McKinney', email: 'binhan628@gmail.com', status: 'Free', role: 'Team Editor', avatar: 'link_to_avatar' },
  { name: 'Jerome Bell', email: 'nvt.isst.nute@gmail.com', status: 'Busy', role: 'Team Owner', avatar: 'link_to_avatar' },
  { name: 'Eleanor Pena', email: 'vuhaithuong.nute@gmail.com', status: 'On Vacation', role: 'Analytics Admin', avatar: 'link_to_avatar' }
];

export default function EmployeesHomePage() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setPageHeadTitle("Employees");
    setEmployees(initialEmployeeData);
  }, []);

  return (
    <div className="page-employees-home">
      <p className="main-label">Employees</p>
      <div className="tool-container">
        <div>
          <p className="text-result">{employees.length} results found</p>
        </div>
        <div className="tool-container-btn">
          <Button className="btn-tool">
            <FilterAltOutlinedIcon />
          </Button>
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
        <BudgetList />
      </div>
      <div className="add-employee-container">
        <Button className="btn-add-employee" component={Link} to="/employees/add">
          <PersonAddAltOutlinedIcon />
          <p>Add Employee</p>
        </Button>
      </div>
      <div>
        <EmployeeList employees={initialEmployeeData} />
      </div>
    </div>
  );
}
