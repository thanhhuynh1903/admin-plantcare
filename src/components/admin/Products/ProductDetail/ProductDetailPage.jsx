import Button from "@mui/material/Button";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { setPageHeadTitle } from "../../../utils/util_web";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

import "./ProductDetailPage.scss";
import { aget } from "../../../utils/util_axios";

export default function ProductDetailPage() {
  const [product, setProduct] = useState(null);

  const {id} = useParams();

  useEffect(() => {
    setPageHeadTitle("Product detail");

    aget(`/plants/${id}`).then((response) => {
      setProduct(response.data);
    });
  }, []);

  return (
    <div className="product-detail-page">
      <div className="main-label">
        <Button component={Link} to="/products">
          <ArrowCircleLeftOutlinedIcon className="btn-back" />
        </Button>
        <p>Product detail - {product?.name}</p>
      </div>

      <div className="content">
        {product && (
          <Grid container spacing={3} sx={{ marginTop: 2 }}>
            {/* Image and Title Section */}
            <Grid item xs={12} sm={4}>
              <img
                className="product-img"
                src={product.img_url[0]}
                alt={product.name}
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <Card>
                <CardContent>
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
                </CardContent>
              </Card>
            </Grid>

            {/* Product Properties Table */}
            <Grid item xs={12}>
              <Paper elevation={3}>
                <Table>
                  <TableBody>
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
                      <TableCell>Price</TableCell>
                      <TableCell>${(product.price / 100).toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Average Rating</TableCell>
                      <TableCell>{product.average_rating}</TableCell>
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
            </Grid>
          </Grid>
        )}
      </div>
    </div>
  );
}
