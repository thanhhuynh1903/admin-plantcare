import { Button } from "@mui/material";
import "./CustomerHomepage.scss";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { useEffect, useState } from "react";
import { setPageHeadTitle } from "../../../utils/util_web";
import { Sort } from "@mui/icons-material";
import CustomerList from "./CustomerList";
import { Link } from "react-router-dom";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

const initialEmployeeData = [
  { name: 'Darlene Robertson', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...', status: 'Open', rate:"150.000" ,balance: '+270.000',deposite:'500.000'  },
  { name: 'Devon Lane', description: 'LOremmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm', status: 'Paid',  rate:"150.000",balance: '+270.000', deposite:'500.000' },
  { name: 'Cody Fisher', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...', status: 'Open',  rate:"150.000",balance: '-270.000',  deposite:'500.000'},
  { name: 'Theresa Webb', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...', status: 'Inactive', rate:"150.000", balance: '-270.000', deposite:'500.000' },
  { name: 'Marvin McKinney', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...', status: 'Due',rate:"70.000", balance: '+270.000', deposite:'500.000' },
  { name: 'Jerome Bell', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...', status: 'Due',rate:"70.000", balance: '-270.000',deposite:'500.000'  },
  { name: 'Eleanor Pena', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...', status: 'Open', rate:"70.000",balance: '+400.000', deposite:'500.000' }
];

export default function CustomerHomepage() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setPageHeadTitle("Customers");
    setEmployees(initialEmployeeData);
  }, []);

  return (
    <div className="page-employees-home">
      <div style={{display:'flex',textAlign:'center',alignItems:"center",justifyContent:'space-between'}}>
        <div style={{display:'flex',textAlign:'center',alignItems:"center",}}> <PermIdentityOutlinedIcon sx={{fontSize:35,color:'#0A5239',marginRight:1}}/><p className="main-label">Customers</p></div>
        
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
      <div className="tool-container" style={{marginBottom:"15px"}}>
        <div>
          <p className="text-result">{employees.length} results found</p>
        </div>

      </div>
      <div>
        <CustomerList employees={initialEmployeeData} />
      </div>
    </div>
  );
}