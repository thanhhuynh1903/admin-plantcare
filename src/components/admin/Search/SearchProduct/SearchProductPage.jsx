import "./SearchProductPage.scss";
import Button from "@mui/material/Button";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { setPageHeadTitle } from "../../../utils/util_web";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { aget } from "@utils/util_axios";
import CircularProgress from "@mui/material/CircularProgress";

export default function SearchProductPage() {
  const [page, setPage] = useState(1);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();
  const itemsPerPage = 10;

  useEffect(() => {
    setPageHeadTitle("Search result - Products");

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
    <div className="search-product-page">
      <div className="main-label">
        <Button component={Link} to="/dashboard">
          <ArrowCircleLeftOutlinedIcon className="btn-back" />
        </Button>
        <p>Search result - Products</p>
      </div>

      <div className="content">
        {loading ? (
          <CircularProgress className="loading-icon" />
        ) : (
          <>
            <p className="text-result">{productData.length} results found matches for: <span className="query">{query}</span> </p>
            {
              productData.length === 0 && (
                <p className="text-result-empty">No results found</p>
              )
            }
            <div className="product-list">
              {displayedProducts.map((product) => (
                <div className="product-card" key={product._id}>
                  <img
                    src={product.img_url[0]}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-info">
                    <Typography variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.sub_name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ID: {product._id}
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

