import { Button } from "@mui/material";
import "./SeedsHomePage.scss";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useEffect, useState } from "react";
import { setPageHeadTitle } from "../../utils/util_web";
import SeedsBudget from "./SeedsBudget";
import SeedsList from "./SeedsList";
import FilterSeeds from "./FilterSeeds";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { aget } from "../../utils/util_axios";
import SeedsAddDialog from "./SeedsAddDialog";
import LoadingIcon from "../commons/LoadingIcon/LoadingIcon";

export default function SeedsHomepage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [openAddSeedsDialog, setOpenAddSeedsDialog] = useState(false);

  const obtainSeedsAPI = async () => {
    setIsLoading(true);
    aget("/seeds")
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
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setPageHeadTitle("Seeds");
    obtainSeedsAPI();
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
    <div className="page-seeds-home">
      <div
        className="main-label"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Inventory2OutlinedIcon sx={{ marginRight: 1 }} /> Seeds
      </div>
      <div className="tool-container">
        <div>
          <p>{data.length} results found</p>
        </div>
        <div className="tool-container-btn">
          {!isLoading && (
            <Button
              className="btn-add-product"
              onClick={() => setOpenAddSeedsDialog(true)}
            >
              + Add seed
            </Button>
          )}

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

      {isLoading ? (
        <LoadingIcon />
      ) : (
        <>
          <div>
            <SeedsBudget />
          </div>
          <div>
            <FilterSeeds
              data={data}
              selectedFilterType={selectedFilterType}
              handleChangeFilterType={handleChangeFilterType}
            />
          </div>
          <div>
            <SeedsList
              data={filteredData}
              onFinishEditing={() => {
                obtainSeedsAPI();
              }}
              onFinishDeleting={() => {
                obtainSeedsAPI();
              }}
            />
          </div>
          <SeedsAddDialog
            open={openAddSeedsDialog}
            onFinish={() => {
              setOpenAddSeedsDialog(false);
              obtainSeedsAPI();
            }}
            onClose={() => setOpenAddSeedsDialog(false)}
          />
        </>
      )}
    </div>
  );
}
