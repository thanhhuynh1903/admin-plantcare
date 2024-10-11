import Button from "@mui/material/Button";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { setPageHeadTitle } from "../../../utils/util_web";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Grid2,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Rating,
  CircularProgress
} from "@mui/material";

import "./PlantersDetailPage.scss";
import { aget } from "../../../utils/util_axios";
import PlantersEditDialog from "./PlantersEditDialog";
import PlantersDetailDeleteDialog from "./PlantersDetailDeleteDialog";

export default function PlantersDetailPage() {
  const [product, setPlanters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const { id } = useParams();

  const obtainPlantersAPI = async () => {
    setLoading(true);
    aget(`/planters/${id}`)
      .then((response) => {
        setPlanters(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setItemToEdit(null);
    setItemToDelete(null);
    setPageHeadTitle("Planter detail");
    obtainPlantersAPI();
  }, []);

  return (
    <div className="planters-detail-page">
      <div className="main-label">
        <Button component={Link} to="/planters">
          <ArrowCircleLeftOutlinedIcon className="btn-back" />
        </Button>
        <p>Planter detail{product && ` - ${product.name}`}</p>
      </div>
      <div className="content">
        {loading ? (
          <div className="loading-container">
            <CircularProgress />
          </div>
        ) : (
          product && (
            <>
              <div className="content-tool">
                <Button
                  className="btn-edit"
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => setItemToEdit(product)}
                >
                  Edit
                </Button>
                <Button
                  className="btn-delete"
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => setItemToDelete(product)}
                >
                  Delete
                </Button>
              </div>
              <Grid2
                className="product-title"
                container
                spacing={3}
                sx={{ marginTop: 2 }}
              >
                <Grid2 item xs={12} sm={4}>
                  <img
                    className="product-img"
                    src={product.img_object[0].img_url}
                    alt={product.name}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Grid2>

                <Grid2 item xs={12}>
                  <p className="product-id">ID: {product._id}</p>
                  <Typography variant="h5" component="div" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {product.introduction}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginTop: 2 }}
                  >
                    {product.describe}
                  </Typography>
                  <div className="product-info">
                    <p className="product-info-label">Material:</p>
                    <p>{product.material}</p>
                  </div>
                  <div className="product-info">
                    <p className="product-info-label">Special Feature:</p>
                    <p>{product.special_feature}</p>
                  </div>
                </Grid2>
              </Grid2>

              {/* Planters Properties Table */}
              <p className="sub-label">Planter specification</p>
              <Paper elevation={3}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Price</TableCell>
                      <TableCell>${(product.price / 100).toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Size</TableCell>
                      <TableCell>{product.size}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Style</TableCell>
                      <TableCell>{product.style}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Planter Form</TableCell>
                      <TableCell>{product.planter_form}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Theme</TableCell>
                      <TableCell>{product.theme}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Finish Type</TableCell>
                      <TableCell>{product.finish_type}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Item Weight</TableCell>
                      <TableCell>{product.item_weight}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Manufacturer</TableCell>
                      <TableCell>{product.manufacturer}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ASIN</TableCell>
                      <TableCell>{product.ASIN}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Model Number</TableCell>
                      <TableCell>{product.item_model_number}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Best Seller Rank</TableCell>
                      <TableCell>{product.best_seller_rank}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Status</TableCell>
                      <TableCell>{product.status}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>First Available</TableCell>
                      <TableCell>
                        {new Date(product.date_first_available).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Average Rating</TableCell>
                      <TableCell>
                        <Rating
                          value={parseFloat(product.customer_reviews)}
                          readOnly
                          precision={0.5}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </>
          )
        )}
        <PlantersEditDialog
          item={itemToEdit}
          onFinish={() => {
            obtainPlantersAPI();
          }}
          onClose={() => {
            setItemToEdit(null);
          }}
        />
        <PlantersDetailDeleteDialog
          open={itemToDelete != null}
          onClose={() => {
            setItemToDelete(null);
          }}
          onFinish={() => {
            setItemToDelete(null);
          }}
          item={itemToDelete}
        />
      </div>
    </div>
  );
}
