import "./SearchSeedsPage.scss";
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

export default function SearchSeedsPage() {
  const [page, setPage] = useState(1);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    setPageHeadTitle("Search result - Seeds");

    setLoading(true);

    setProductData([]);

    if (query) {
      aget(`/seeds/search?searchName=${query}`).then((res) => {
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
    <div className="search-seeds-page">
      <div className="main-label">
        <Button component={Link} to="/seeds">
          <ArrowCircleLeftOutlinedIcon className="btn-back" />
        </Button>
        <p>Search result - Seeds</p>
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
            <div className="seed-list">
              {displayedProducts.map((seed) => (
                <div
                  className="seed-card"
                  key={seed._id}
                  onClick={() => {
                    navigate(`/seeds/s/${seed._id}`);
                  }}
                >
                  <img
                    src={seed.img_url[0]}
                    alt={seed.name}
                    className="seed-image"
                  />
                  <div className="seed-info">
                    <Typography variant="h5" component="div">
                      {seed.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {seed.sub_name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ID: {seed._id}
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
