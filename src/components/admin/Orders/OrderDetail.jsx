import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Checkbox,
  InputAdornment,
  TablePagination,
  Chip,
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CircleIcon from "@mui/icons-material/Circle";
import SmartPlanter from "../../../assets/pages/OrderDetail/SmartPlanter.jpg";
import StepperShipping from "./StepperShipping";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { aget } from "../../utils/util_axios";
import NoteOrderStatus from "./NoteOrderStatus";
import Grid from "@mui/material/Grid";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import LoadingIcon from "../commons/LoadingIcon/LoadingIcon";
import FloatingActionButtons from "./FloatingActionButtons";
import { useNavigate } from "react-router-dom";
import { adelete } from "../../utils/util_axios";

const OrderDetail = () => {
  const [page, setPage] = useState(0);
  const [Order, setOrder] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { id } = useParams();
  const [loading, setLoading] = useState(true); // Initial loading state
  const navigate = useNavigate();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchApiOrderId = async () => {
      try {
        setLoading(true); // Start loading
        await aget(`/orders/${id}`).then((res) => {
          setOrder(res.data);
          console.log(res.data);
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApiOrderId();
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteOrder = async () => {
    try {
      await adelete(`/orders/${id}`);
      navigate("/orders"); // Redirect to the orders list after deletion
    } catch (error) {
      console.error("Failed to delete the order:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "Confirmed":
        return "warning";
      case "Failed Delivery":
        return "error";
      default:
        return "default";
    }
  };

  const formattedNumber = (number) => {
    // Format the number with dots as thousands separators and no decimal places
    const formatted = Math.floor(number)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return formatted;
  };

  const ProductCard = ({ row }) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {Array.isArray(row?.item_id?.product?.img_url) &&
        row.item_id?.product?.img_url?.length > 0 ? (
          row.item_id?.product?.img_url
            .slice(0, 1)
            .map((url, index) => (
              <img
                key={index}
                src={url}
                alt={row?.product?.name}
                className="w-24 h-24 object-cover mr-4"
                style={{ width: "95px", height: "90px", objectFit: "cover" }}
              />
            ))
        ) : (
          <Box
            sx={{
              width: "95px",
              height: "90px",
              backgroundColor: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "10px",
            }}
          >
            No Image
          </Box>
        )}
        <Typography sx={{ marginLeft: 1 }}>{row?.item_id?.product?.name}</Typography>
      </Box>
    );
  };

  return (
    <div>
      {" "}
      {loading ? (
        <LoadingIcon />
      ) : (
        <div>
          <Box sx={{ borderRadius: "20px", backgroundColor: "#FFF" }}>
            <Box sx={{ width: "90%", margin: "0 auto", paddingY: "20px" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h4" gutterBottom>
                  Order detail
                </Typography>
                <Typography variant="h3" gutterBottom>
                  <Chip
                    label={Order?.status}
                    color={getStatusColor(Order?.status)}
                    variant="inlined"
                  />
                </Typography>
              </Box>
              <Typography variant="h6">Order Id : {Order._id}</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#D9D5EC" }}>
                      <TableCell
                        sx={{
                          color: "#6E6893",
                          fontWeight: "bold",
                          width: "25%",
                        }}
                      >
                        Items
                      </TableCell>
                      <TableCell sx={{ color: "#6E6893", fontWeight: "bold" }}>
                        Order date
                      </TableCell>
                      {/* <TableCell sx={{ color: "#6E6893", fontWeight: "bold" }}>
                  Status
                </TableCell> */}
                      <TableCell sx={{ color: "#6E6893", fontWeight: "bold" }}>
                        Quantity
                      </TableCell>
                      <TableCell sx={{ color: "#6E6893", fontWeight: "bold" }}>
                        TYPE
                      </TableCell>
                      <TableCell sx={{ color: "#6E6893", fontWeight: "bold" }}>
                        PRICE
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Order?.list_cart_item_id
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <TableRow key={row.id}>
                          <TableCell
                            sx={{
                              display: "flex",
                              textAlign: "center",
                              alignItems: "center",
                              fontSize: "15px",
                              fontWeight: "500",
                            }}
                          >
                            <ProductCard row={row} />
                          </TableCell>
                          <TableCell
                            sx={{ fontSize: "15px", color: "#6E6893" }}
                          >
                            Last update: {row.item_id?.updatedAt}
                          </TableCell>
                          <TableCell>{row.item_id?.quantity}</TableCell>
                          <TableCell
                            sx={{ fontSize: "15px", color: "#6E6893" }}
                          >
                            {row?.item_id?.product_type}
                          </TableCell>
                          <TableCell
                            sx={{ fontSize: "15px", color: "#6E6893" }}
                          >
                            {formattedNumber(row.item_id.item_total_price)}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={Order?.list_cart_item_id?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              <Typography variant="h6" gutterBottom sx={{ textAlign: "end" }}>
                Payment method: {Order?.payment_method}
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ textAlign: "end" }}>
                TOTAL PRICE: {formattedNumber(Order?.total_price)} VND
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} md={7}>
                  <Box component="form" sx={{ mt: 2, mb: 4 }}>
                    <TextField
                      slotProps={{
                        input: {
                          readOnly: true,
                        },
                      }}
                      label="Customer Id"
                      value={`${Order?.customer_id}`}
                      fullWidth
                      margin="normal"
                    />{" "}
                    <TextField
                      slotProps={{
                        input: {
                          readOnly: true,
                        },
                      }}
                      label="Contact Number"
                      value={`${Order?.delivery_information?.phone_number}`}
                      fullWidth
                      margin="normal"
                    />
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <TextField
                        slotProps={{
                          input: {
                            readOnly: true,
                          },
                        }}
                        label="Order date create"
                        value={`${Order?.createdAt}`}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        slotProps={{
                          input: {
                            readOnly: true,
                          },
                        }}
                        label="Order date update"
                        value={`${Order?.updatedAt}`}
                        fullWidth
                        margin="normal"
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <TextField
                        slotProps={{
                          input: {
                            readOnly: true,
                          },
                        }}
                        label="Delivery Name"
                        value={`${Order?.delivery_method?.delivery_method_name}`}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Delivery price"
                        value={`${formattedNumber(
                          Order?.delivery_method?.price
                        )}`}
                        fullWidth
                        margin="normal"
                        InputProps={{
                          endAdornment: (
                            <Typography position="end" sx={{ opacity: "0.5" }}>
                              VND
                            </Typography>
                          ),
                        }}
                      />
                    </Box>
                    <TextField
                      label="Address"
                      value={`${Order?.delivery_information?.address}`}
                      fullWidth
                      margin="normal"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Checkbox
                              icon={<CheckIcon />}
                              checked
                              sx={{
                                color: "green",
                                "&.Mui-checked": {
                                  color: "green",
                                },
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      label="Address detail"
                      value={`${Order?.delivery_information?.address_detail}`}
                      fullWidth
                      margin="normal"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Checkbox
                              icon={<CheckIcon />}
                              checked
                              sx={{
                                color: "green",
                                "&.Mui-checked": {
                                  color: "green",
                                },
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6} md={5}>
                  {Order?.voucher_id === null ? (
                    <Box
                      component="form"
                      sx={{
                        mt: 4,
                        mb: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 2,
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        textAlign: "center",
                      }}
                    >
                      <img
                        src="https://cdn3d.iconscout.com/3d/premium/thumb/discount-voucher-3d-icon-download-in-png-blend-fbx-gltf-file-formats--coupon-black-friday-pack-icons-5655994.png?f=webp"
                        alt="No Voucher"
                        style={{ width: "100px", marginBottom: "20px" }}
                      />
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ color: "#555" }}
                      >
                        No Voucher Applied
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        Apply a voucher code at checkout to get a discount on
                        your order.
                      </Typography>
                    </Box>
                  ) : (
                    <Box component="form" sx={{ mt: 2, mb: 4 }}>
                      <TextField
                        label="Vouncher code"
                        value={`${Order?.voucher_id.voucher_code}`}
                        fullWidth
                        margin="normal"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {Order?.voucher_id.status ? (
                                <Checkbox
                                  icon={<CheckIcon />}
                                  checked
                                  sx={{
                                    color: "green",
                                    "&.Mui-checked": {
                                      color: "green",
                                    },
                                  }}
                                />
                              ) : (
                                <IndeterminateCheckBoxIcon
                                  icon={<IndeterminateCheckBoxIcon />}
                                  sx={{
                                    color: "red",
                                    "&.Mui-checked": {
                                      color: "red",
                                    },
                                  }}
                                />
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />{" "}
                      <TextField
                        slotProps={{
                          input: {
                            readOnly: true,
                          },
                        }}
                        label="Vouncher name"
                        value={`${Order?.voucher_id.voucher_name}`}
                        fullWidth
                        margin="normal"
                      />
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <TextField
                          slotProps={{
                            input: {
                              readOnly: true,
                            },
                          }}
                          label="Vouncher start day"
                          value={`${Order?.voucher_id.start_day}`}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          slotProps={{
                            input: {
                              readOnly: true,
                            },
                          }}
                          label="Vouncher end day"
                          value={`${Order?.voucher_id.end_day}`}
                          fullWidth
                          margin="normal"
                        />
                      </Box>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <TextField
                          slotProps={{
                            input: {
                              readOnly: true,
                            },
                          }}
                          label="voucher discount"
                          value={`${Order?.voucher_id.voucher_discount}`}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="Vouncher quantity"
                          value={`${Order?.voucher_id.quantity}`}
                          fullWidth
                          margin="normal"
                        />
                      </Box>
                      <TextField
                        label="Description"
                        value={`${Order?.voucher_id?.description}`}
                        fullWidth
                        margin="normal"
                      />
                    </Box>
                  )}
                </Grid>
              </Grid>

              <StepperShipping
                statusship={Order?.tracking_status_dates || []}
              />
            </Box>
          </Box>
          <Box
            sx={{
              borderRadius: "20px",
              backgroundColor: "#FFF",
              marginY: 2,
              height: "250px",
              alignContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <NoteOrderStatus status={Order?.status} />
            </Box>
            <Typography sx={{ textAlign: "center", mt: 2 }}>
              {Order?.delivered_date ? (
                <>
                  <h2>{Order?.status}</h2>
                  This product has been delivered at{" "}
                  <strong>{Order.delivered_date}</strong>
                </>
              ) : Order?.status === "Failed Delivery" ||
                Order?.status === "Out of Delivery" ? (
                <div>
                  <h2>{Order?.status}</h2>
                  This order have been {Order?.status} at {Order?.tracking_status_dates[2]?.value}!! Please check again !!
                </div>
              ) : Order?.status === "Confirmed" ? (
                <div>
                  <h2>{Order?.status}</h2>
                  This Order have been confirmed at {Order?.tracking_status_dates[0]?.value}!!
                </div>
              ) : (
                <div>
                  <h2>{Order?.status}</h2>
                  This Order is shipping to customer at  {Order?.tracking_status_dates[1]?.value}!!
                </div>
              )}
              <Typography sx={{ textAlign: "center", fontSize: "15px" }}>
                <strong>Order Code:</strong> {Order?.order_code}
              </Typography>
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteOrder}
            sx={{ mb: 2 }}
          >
            Delete Order
          </Button>
        </div>
      )}
      <FloatingActionButtons status={Order} />
    </div>
  );
};

export default OrderDetail;
