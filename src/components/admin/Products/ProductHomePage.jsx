import { Button,Typography } from "@mui/material";
import "./ProductHomePage.scss";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { useEffect, useState } from "react";
import { setPageHeadTitle } from "../../utils/util_web";
import { Sort } from "@mui/icons-material";
import ProductBudget from "./ProductBudget";
import { Link } from "react-router-dom";
import ProductList from "./ProductList";
import FilterProduct from "./FilterProduct";
import logo from "@assets/logo.png";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

export default function ProductHomepage() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setPageHeadTitle("Products");
    // setEmployees(initialEmployeeData);
  }, []);

  return (
    <div className="page-employees-home">
      <div className="main-label" style={{display:'flex', alignItems:'center'}}>
        <Inventory2OutlinedIcon sx={{marginRight:1}}/>{" "}
        Products</div>
      <div className="tool-container">
        <div>
          <p className="text-result">{employees.length} results found</p>
        </div>
        <div className="tool-container-btn">
          {/* <Button className="btn-tool">
            <FilterAltOutlinedIcon />
          </Button> */}
          <Typography
          variant="h6"
          id="tableTitle"
          component="div"
        >
          <Button
            sx={{
              fontSize: "12px",
              background: "#009e71",
              fontWeight: "bold",
              color: "#FFF",
              paddingX: "8px",
              paddingY: "8px",
              borderRadius: "5px",
            }}
          >
          ADD PRODUCT
          </Button>
        </Typography>
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
        <ProductBudget />
      </div>
      <div>
        <FilterProduct />
      </div>
       <div>
        <ProductList />
      </div>
    </div>
  );
}

