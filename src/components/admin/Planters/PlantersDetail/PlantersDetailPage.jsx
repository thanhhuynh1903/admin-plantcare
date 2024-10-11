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
    aget(`/plants/${id}`)
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
    setPageHeadTitle("Planters detail");
    obtainPlantersAPI();
  }, []);

  return (
    <div className="planters-detail-page">
      <div className="main-label">
        <Button component={Link} to="/planters">
          <ArrowCircleLeftOutlinedIcon className="btn-back" />
        </Button>
        <p>Planters detail{product && ` - ${product.name}`}</p>
      </div>
      <div className="content">
        {loading ? ( // Show CircularProgress while loading
          <div className="loading-container">
            <CircularProgress />
          </div>
        ) : (
          product && (
            <>
              <div className="content-tool">
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
                    src={product.img_url[0]}
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
                    {product.sub_name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginTop: 2 }}
                  >
                    {product.describe}
                  </Typography>
                  <div className="product-info">
                    <p className="product-info-label">Genus:</p>
                    <p>{product.genus_id?.name || "Unknown"}</p>
                  </div>
                  <div className="product-info">
                    <p className="product-info-label">Plant type:</p>
                    <p>{product.plant_type_id?.plant_type_name || "Unknown"}</p>
                  </div>
                </Grid2>
              </Grid2>

              {/* Planters Properties Table */}
              <p className="sub-label">Plant specification</p>
              <Paper elevation={3}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Price</TableCell>
                      <TableCell>${(product.price / 100).toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Height</TableCell>
                      <TableCell>{product.height}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Width</TableCell>
                      <TableCell>{product.width}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Zones</TableCell>
                      <TableCell>{product.zones}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Uses</TableCell>
                      <TableCell>{product.uses}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tolerance</TableCell>
                      <TableCell>{product.tolerance}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Bloom Time</TableCell>
                      <TableCell>{product.bloom_time}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Light</TableCell>
                      <TableCell>{product.light}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Moisture</TableCell>
                      <TableCell>{product.moisture}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Plant Type</TableCell>
                      <TableCell>
                        {product.plant_type_id.plant_type_name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Seasonal Interest</TableCell>
                      <TableCell>{product.plant_seasonal_interest}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Average Rating</TableCell>
                      <TableCell>
                        <Rating
                          value={parseFloat(product.average_rating)}
                          readOnly
                          precision={0.5}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Care</TableCell>
                      <TableCell>{product.care}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Problems</TableCell>
                      <TableCell>{product.problems}</TableCell>
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
