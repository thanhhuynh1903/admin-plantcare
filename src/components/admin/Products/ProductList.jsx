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
  Menu,
  MenuItem,
  Typography,
  Rating,
  TablePagination,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import ProductDeleteDialog from "./ProductDeleteDialog";

export default function ProductList({ data }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const [deletedItem, setDeletedItem] = useState(null);

  const handleMenuOpen = (event, id) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setMenuId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuId(null);
  };

  const handleProductClick = (id) => {
    navigate(`/products/p/${id}`);
  };

  const handleEdit = (id) => {
    console.log("Edit product with id:", id);
    handleMenuClose();
  };

  const handleDelete = (item) => {
    setDeletedItem(item);
    handleMenuClose();
  };

  // Pagination Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
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
                onClick={() => handleProductClick(item._id)}
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
                  <IconButton onClick={(e) => handleMenuOpen(e, item._id)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={menuId === item._id}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <MenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(item._id);
                      }}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item);
                      }}
                    >
                      Delete
                    </MenuItem>
                  </Menu>
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
      <ProductDeleteDialog
        open={deletedItem !== null}
        onClose={() => setDeletedItem(null)}
        onFinish={() => setDeletedItem(null)}
        item={deletedItem}
      />
    </>
  );
}
