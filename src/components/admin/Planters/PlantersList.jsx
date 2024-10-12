import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Typography,
  TablePagination,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import PlantersDeleteDialog from "./PlantersDeleteDialog";
import PlantersEditDialog from "./PlantersEditDialog";

export default function PlantersList({ data = [], onFinishEditing, onFinishDeleting }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const [actionedItem, setActionedItem] = useState(null);
  const [editedItem, setEditedItem] = useState(null);
  const [deletedItem, setDeletedItem] = useState(null);

  const handleMenuOpen = (event, item) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setActionedItem(item);
  };

  const handleMenuClose = (event) => {
    event?.stopPropagation();
    setEditedItem(null);
    setDeletedItem(null);
    setActionedItem(null);
    setAnchorEl(null);
  };

  const handlePlantersClick = (id) => {
    // Only navigate if no menu is open
    if (!anchorEl) {
      navigate(`/planters/p/${id}`);
    }
  };

  const handleEdit = (item) => {
    handleMenuClose();
    setEditedItem(item);
  };

  const handleDelete = (item) => {
    handleMenuClose();
    setDeletedItem(item);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Paginate the data
  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name / Subname</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow
                key={item._id}
                sx={{ cursor: "pointer" }}
                hover
                onClick={() => handlePlantersClick(item._id)}
              >
                <TableCell>
                  <Avatar
                    src={item.img_object && item.img_object[0]?.img_url}
                    alt={item?.name}
                    sx={{ width: 56, height: 56 }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body1" fontWeight="bold">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.introduction}
                  </Typography>
                </TableCell>
                <TableCell>{item.price.toFixed(2)} VND</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>{item.item_model_number}</TableCell>
                <TableCell>{item.status || "Censored"}</TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuOpen(e, item)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={data.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 50]}
          labelRowsPerPage="Items per page:"
          sx={{ display: "flex", justifyContent: "flex-end" }}
        />
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={actionedItem != null}
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
            handleEdit(actionedItem);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(actionedItem);
          }}
        >
          Delete
        </MenuItem>
      </Menu>

      <PlantersEditDialog
        item={editedItem}
        onClose={handleMenuClose}
        onFinish={() => {
          handleMenuClose();
          onFinishEditing();
        }}
      />
      <PlantersDeleteDialog
        onClose={() => setDeletedItem(null)}
        onFinish={() => {
          handleMenuClose();
          onFinishDeleting();
        }}
        item={deletedItem}
      />
    </>
  );
}
