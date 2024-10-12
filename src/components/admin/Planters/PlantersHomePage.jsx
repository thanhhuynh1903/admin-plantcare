import { Button } from "@mui/material";
import "./PlantersHomePage.scss";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useEffect, useState } from "react";
import { setPageHeadTitle } from "../../utils/util_web";
import PlantersBudget from "./PlantersBudget";
import PlantersList from "./PlantersList";
import FilterPlanters from "./FilterPlanters";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { aget } from "../../utils/util_axios";
import PlantersAddDialog from "./PlantersAddDialog";
import LoadingIcon from "../commons/LoadingIcon/LoadingIcon";

export default function PlantersHomepage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [openAddPlantersDialog, setOpenAddPlantersDialog] = useState(false);

  const obtainPlantersAPI = async () => {
    setIsLoading(true);
    aget("/planters")
      .then((response) => {
        setData(response.data);
        setFilteredData(
          response.data.sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime() ||
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setPageHeadTitle("Planters");

    obtainPlantersAPI();
  }, []);

  const filterType = [
    {
      id: 0,
      name: "All",
    },
    {
      id: 1,
      name: "In stock",
    },
    {
      id: 2,
      name: "Out of stock",
    },
    {
      id: 3,
      name: "Censored",
    },
  ];

  const [selectedFilterType, setSelectedFilterType] = useState(filterType[0]);

  const handleChangeFilterType = (newVal) => {
    setSelectedFilterType(filterType[newVal]);

    if (newVal === 0) {
      setFilteredData(data);
    } else if (newVal === 1) {
      setFilteredData(data.filter((p) => p.status == "In Stock"));
    } else if (newVal === 2) {
      setFilteredData(data.filter((p) => p.status == "Out of Stock"));
    } else if (newVal === 3) {
      setFilteredData(
        data.filter(
          (p) => p.status == "Censored" || p.status == "Deleted" || !p.status
        )
      );
    }
  };

  return (
    <div className="page-planters-home">
      {isLoading ? (
        <LoadingIcon />
      ) : (
        <>
          <div
            className="main-label"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Inventory2OutlinedIcon sx={{ marginRight: 1 }} />
            <p>Planters</p>
          </div>
          <div className="tool-container">
            <div>
              <p>{data.length} results found</p>
            </div>
            <div className="tool-container-btn">
              <Button
                className="btn-add-planter"
                onClick={() => setOpenAddPlantersDialog(true)}
              >
                + Add planter
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
                <p>August 2021</p>
                <Button className="btn-tool-nav">
                  <KeyboardArrowRightOutlinedIcon />
                </Button>
              </div>
            </div>
          </div>
          <div>
            <PlantersBudget />
          </div>
          <div>
            <FilterPlanters
              data={data}
              selectedFilterType={selectedFilterType}
              handleChangeFilterType={handleChangeFilterType}
            />
          </div>
          <div>
            <PlantersList
              data={filteredData}
              onFinishEditing={() => {
                obtainPlantersAPI();
              }}
              onFinishDeleting={() => {
                obtainPlantersAPI();
              }}
            />
          </div>
        </>
      )}
      <PlantersAddDialog
        open={openAddPlantersDialog}
        onClose={() => setOpenAddPlantersDialog(false)}
      />
    </div>
  );
}

