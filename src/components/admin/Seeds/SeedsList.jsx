import React, { useEffect, useState } from "react";
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
  Rating,
  TablePagination,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import SeedsDeleteDialog from "./SeedsDeleteDialog";
import SeedsEditDialog from "./SeedsEditDialog";

export default function SeedsList({ data, onFinishEditing, onFinishDeleting }) {
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

  const handleSeedsClick = (id) => {
    if (!anchorEl) {
      navigate(`/seeds/s/${id}`);
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
              <TableCell>Rating</TableCell>
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
                onClick={() => handleSeedsClick(item._id)}
              >
                <TableCell>
                  <Avatar
                    src={item.img_url[0]}
                    alt={item.name}
                    sx={{ width: 56, height: 56 }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body1" fontWeight="bold">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.sub_name}
                  </Typography>
                </TableCell>
                <TableCell>{item.price.toFixed(2)} VND</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>
                  <Rating
                    value={parseFloat(item.average_rating)}
                    readOnly
                    precision={0.5}
                  />
                </TableCell>
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

      <SeedsEditDialog
        item={editedItem}
        onClose={handleMenuClose}
        onFinish={() => {
          handleMenuClose();
          onFinishEditing();
        }}
      />
      <SeedsDeleteDialog
        onClose={() => setDeletedItem(null)}
        onFinish={() => {
          setDeletedItem(null)
          onFinishDeleting();
        }}
        item={deletedItem}
      />
    </>
  );
}
