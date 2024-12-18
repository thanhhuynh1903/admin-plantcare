import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  TablePagination,
  Menu,
  MenuItem,
  Chip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useNavigate } from "react-router-dom";
import OrdersDeleteDialog from "./OrdersDeleteDialog";

export default function OrderList({
  orders,
  onFinishEditing,
  onFinishDeleting,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const [actionedOrder, setActionedOrder] = useState(null);
  const [editedOrder, setEditedOrder] = useState(null);
  const [deletedOrder, setDeletedOrder] = useState(null);

  const handleMenuOpen = (event, order) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setActionedOrder(order);
  };

  const handleMenuClose = (event) => {
    event?.stopPropagation();
    setEditedOrder(null);
    setDeletedOrder(null);
    setActionedOrder(null);
    setAnchorEl(null);
  };

  const handleOrderClick = (id) => {
    if (!anchorEl) {
      navigate(`/orders/o/${id}`);
    }
  };

  const handleEdit = (order) => {
    handleMenuClose();
    setEditedOrder(order);
  };

  const handleDelete = (order) => {
    handleMenuClose();
    setDeletedOrder(order);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  // Paginate the data
  const paginatedOrders = orders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Delivery Method</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow
                key={order._id}
                sx={{ cursor: "pointer" }}
                hover
                onClick={() => handleOrderClick(order._id)}
              >
                <TableCell>
                  <Typography variant="body1" fontWeight="bold">
                    {order._id}
                  </Typography>
                </TableCell>
                <TableCell>{order.customer_id}</TableCell>
                <TableCell>
                  {order.delivery_method.delivery_method_name}
                </TableCell>
                <TableCell>
                  {order.total_price.toFixed(2)} VND{" "}
                  {order.voucher_id && (
                    <LocalOfferIcon sx={{ ml: 1 }} color="primary" />
                  )}{" "}
                  {/* Show price tag if voucher exists */}
                </TableCell>
                <TableCell>{order.payment_method}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuOpen(e, order)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={orders.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 50]}
          labelRowsPerPage="Orders per page:"
          sx={{ display: "flex", justifyContent: "flex-end" }}
        />
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={actionedOrder != null}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(actionedOrder);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(actionedOrder);
          }}
        >
          Delete
        </MenuItem>
      </Menu>

      <OrdersDeleteDialog
        item={deletedOrder}
        onClose={handleMenuClose}
        onFinish={() => {
          handleMenuClose();
          setDeletedOrder(null);
          setPage(0);
          onFinishDeleting();
        }}
      />
    </>
  );
}
