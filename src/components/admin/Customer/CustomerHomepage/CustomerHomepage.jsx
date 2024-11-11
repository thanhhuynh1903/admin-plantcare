import { Button } from "@mui/material";
import "./CustomerHomepage.scss";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useEffect, useState } from "react";
import { setPageHeadTitle } from "../../../utils/util_web";
import CustomerList from "./CustomerList";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { aget } from "../../../utils/util_axios";
import LoadingIcon from "../../commons/LoadingIcon/LoadingIcon";
import CustomerStats from "./CustomerStats";
import { exportPremiumUsersToExcel } from "../../../utils/util_export";

export default function CustomerHomepage() {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([
    {
      _id: "",
      email: "",
      password: "",
      role: "",
      status: false,
      createdAt: "",
      updatedAt: "",
      __v: 0,
      name: "",
      rank: ""
    }
  ]);

  useEffect(() => {
    setPageHeadTitle("Customers");
    fetchUser();
  }, []);


  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await aget(`/users`);
      const userData = response.data;
      setCustomers(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-customers-home">
      <div style={{ display: 'flex', textAlign: 'center', alignItems: "center", justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', textAlign: 'center', alignItems: "center", }}> <PermIdentityOutlinedIcon sx={{ fontSize: 35, color: '#0A5239', marginRight: 1 }} /><p className="main-label">Customers</p></div>

        <div className="tool-container-btn">
          <Button
            className="btn-tool"
            onClick={() => {
              exportPremiumUsersToExcel();
            }}
          >
            Export premium user
          </Button>
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
            <p>November 2024</p>
            <Button className="btn-tool-nav">
              <KeyboardArrowRightOutlinedIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="tool-container" style={{ marginBottom: "15px" }}>
        <div>
          {!loading &&
            <p className="text-result">{customers?.length} results found</p>
          }
        </div>

      </div>
      <div>
        {loading ? (
          <LoadingIcon />
        ) : (
          <div>
            <CustomerStats customerData={customers} />
            <CustomerList employees={customers} />
          </div>
        )
        }
      </div>
    </div>
  );
}
