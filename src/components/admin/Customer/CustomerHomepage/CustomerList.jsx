import React, { useState, useMemo, useEffect } from "react";
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar,
  Typography, Paper, IconButton, Tooltip, Avatar
} from "@mui/material";
import { Delete as DeleteIcon, FilterList as FilterListIcon } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BpCheckbox from "./BpCheckbox/BpCheckbox";
import ModalPopup from "./ModalPopup/ModalPopup";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";

const headCells = [
  { id: "ID", label: "#" }, { id: "AVATAR", label: "" }, { id: "NAME", label: "NAME" },
  { id: "EMAIL", label: "EMAIL" }, { id: "STATUS", label: "STATUS" }, { id: "RANK", label: "RANK" },
  { id: "DOB", label: "Create date" }, { id: "ACTION", label: <MoreVertIcon /> },
];

const rankStyles = {
  Premium: { backgroundColor: "#FFECCC", color: "#965E00" },
  Normal: { backgroundColor: "#CDFFCD", color: "#007F00" },
};

const getComparator = (order, orderBy) => (a, b) =>
  order === "desc"
    ? (a[orderBy] > b[orderBy] ? -1 : 1)
    : (a[orderBy] < b[orderBy] ? -1 : 1);

const EnhancedTableHead = ({ order, orderBy, onSelectAllClick, onRequestSort, numSelected, rowCount }) => (
  <TableHead>
    <TableRow>
      <TableCell padding="checkbox">
        <BpCheckbox indeterminate={numSelected > 0 && numSelected < rowCount} checked={numSelected === rowCount} onChange={onSelectAllClick} />
      </TableCell>
      {headCells.map((headCell) => (
        <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
          <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : "asc"} onClick={() => onRequestSort(headCell.id)}>
            {headCell.label}
          </TableSortLabel>
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

const EnhancedTableToolbar = ({ numSelected }) => (
  <Toolbar>
    <Typography sx={{ flex: "1 1 100%" }} variant="subtitle1" component="div">
      {numSelected > 0 ? `${numSelected} selected` : ""}
    </Typography>
    <Tooltip title={numSelected > 0 ? "Delete" : "Filter list"}>
      <IconButton>{numSelected > 0 ? <DeleteIcon /> : <FilterListIcon />}</IconButton>
    </Tooltip>
  </Toolbar>
);

export default function CustomerList({ employees }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("NAME");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSelectAllClick = (event) => setSelected(event.target.checked ? employees.map((n) => n.name) : []);
  const handleRequestSort = (property) => setOrder(order === "asc" && orderBy === property ? "desc" : "asc");
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const sortedData = useMemo(() => [...employees].sort(getComparator(order, orderBy)), [order, orderBy, employees]);
  const visibleRows = useMemo(() => sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [sortedData, page, rowsPerPage]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table size="medium">
            <EnhancedTableHead numSelected={selected.length} order={order} orderBy={orderBy} onSelectAllClick={handleSelectAllClick} onRequestSort={handleRequestSort} rowCount={employees.length} />
            <TableBody>
              {visibleRows.map((row, index) => (
                <TableRow hover role="checkbox" aria-checked={isSelected(row.name)} tabIndex={-1} key={row.name} selected={isSelected(row.name)}>
                  <TableCell padding="checkbox">
                    <BpCheckbox checked={isSelected(row.name)} onClick={(e) => e.stopPropagation()} />
                  </TableCell>
                  <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                  <TableCell><Avatar src={row.avatar_url} /></TableCell>
                  <TableCell style={{ color: row.name ? "inherit" : "gray" }}>
                    {row.name || "Not updated yet..."}
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    <span style={{ color: row.status ? "#4F5AED" : "#5A6376", backgroundColor: row.status ? "#F0F1FA" : "#E9EDF5", padding: "3px 10px", borderRadius: "15px" }}>
                      {row.status ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span style={{ ...rankStyles[row.rank], padding: "3px 10px", borderRadius: "15px", display: "flex", alignItems: "center" }}>
                      <CircleRoundedIcon sx={{ fontSize: "10px", marginRight: "5px" }} /> {row.rank}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell><ModalPopup employee={row} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination rowsPerPageOptions={[5, 10, 25, 50]} component="div" count={employees.length} rowsPerPage={rowsPerPage} page={page} onPageChange={(e, newPage) => setPage(newPage)} onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))} />
      </Paper>
    </Box>
  );
}
