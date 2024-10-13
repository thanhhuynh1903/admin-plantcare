import "./SearchPlantsPage.scss";
import Button from "@mui/material/Button";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { setPageHeadTitle } from "../../../utils/util_web";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { aget } from "@utils/util_axios";
import CircularProgress from "@mui/material/CircularProgress";
import LoadingIcon from "../../commons/LoadingIcon/LoadingIcon";

export default function SearchPlantsPage() {
  const [page, setPage] = useState(1);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    setPageHeadTitle("Search result - Plants");

    setLoading(true);

    setProductData([]);

    if (query) {
      aget(`/plants/search?searchName=${query}`).then((res) => {
        console.log(res.data);
        setProductData(res.data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [query]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const displayedProducts = productData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="search-plants-page">
      <div className="main-label">
        <Button component={Link} to="/plants">
          <ArrowCircleLeftOutlinedIcon className="btn-back" />
        </Button>
        <p>Search result - Plants</p>
      </div>

      <div className="content">
        {loading ? (
          <LoadingIcon />
        ) : (
          <>
            <p className="text-result">
              {productData.length} results matches for:{" "}
              <span className="query">{query}</span>{" "}
            </p>
            {productData.length === 0 && (
              <p className="text-result-empty">No results found</p>
            )}
            <div className="plant-list">
              {displayedProducts.map((plant) => (
                <div
                  className="plant-card"
                  key={plant._id}
                  onClick={() => {
                    navigate(`/plants/p/${plant._id}`);
                  }}
                >
                  <img
                    src={plant.img_url[0]}
                    alt={plant.name}
                    className="plant-image"
                  />
                  <div className="plant-info">
                    <Typography variant="h5" component="div">
                      {plant.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {plant.sub_name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ID: {plant._id}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
            {productData.length > 0 && (
              <div className="pagination-container">
                <Pagination
                  count={Math.ceil(productData.length / itemsPerPage)}
                  page={page}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded"
                  className="pagination"
                />
                <div className="pagination-info">
                  Showing {displayedProducts.length} of {productData.length}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
