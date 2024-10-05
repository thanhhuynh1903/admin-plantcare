import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch,
  Avatar,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
  Edit,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { visuallyHidden } from "@mui/utils";
import "./CustomerList.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BpCheckbox from "./BpCheckbox/BpCheckbox";
import ModalPopup from "./ModalPopup/ModalPopup";
import { useEffect } from "react";
const statusClasses = {
  Free: "status-free",
  Busy: "status-busy",
  Working: "status-working",
  "On Vacation": "status-vacation",
};

const headCells = [
  { id: "ID", numeric: false, disablePadding: false, label: "#" },
  { id: "NAME", numeric: false, disablePadding: false, label: "NAME" },
  {
    id: "DESCRIPTION",
    numeric: false,
    disablePadding: false,
    label: "DESCRIPTION",
  },
  { id: "STATUS", numeric: false, disablePadding: false, label: "STATUS" },
  { id: "RATE", numeric: false, disablePadding: false, label: "RATE" },
  { id: "BALANCE", numeric: false, disablePadding: false, label: "BALANCE" },
  { id: "DEPOSITE", numeric: false, disablePadding: false, label: "DEPOSITE" },
  {
    id: "ACTION",
    numeric: false,
    disablePadding: false,
    label: <MoreVertIcon />,
  },
];

function descendingComparator(a, b, orderBy) {
  if (typeof a[orderBy] === 'number' && typeof b[orderBy] === 'number') {
    return b[orderBy] - a[orderBy];
  }
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <BpCheckbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              sx={{ fontSize: "12px", fontWeight: "bold", color: "#464F60" }}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  return (
    <Toolbar style={{ backgroundColor: "#F4F7FC" }}>
      {numSelected > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div"></Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


export default function CustomerList({ employees }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("NAME");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    setEmployeeData(employees);
  }, [employees]);

  const handleRequestSort = (event) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = employeeData.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const sortedData = useMemo(
    () => [...employeeData].sort(getComparator(order, orderBy)),
    [order, orderBy, employeeData]
  );

  const visibleRows = useMemo(
    () => sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [sortedData, page, rowsPerPage]
  );

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employeeData.length) : 0;

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={employeeData.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                    sx={{
                      cursor: "pointer",
                      backgroundColor: index % 2 === 0 ? "#F9FAFC" : "inherit",
                    }}
                  >
                    <TableCell padding="checkbox">
                      <BpCheckbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="16px"
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        sx={{ fontSize: "13.4px", fontWeight: "bold" }}
                      >
                        {row.name}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ width: "270px", height: "40px" }}>
                      <Box
                        component="div"
                        sx={{
                          width: "inherit",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "block",
                        }}
                      >
                        {truncate(row.description, 65)}{" "}
                        {/* Adjust the number 50 as needed */}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`status ${statusClasses[row.status]}`}
                        style={{
                          fontSize: "14px",
                          padding: "3px 10px",
                          borderRadius: "15px",
                          backgroundColor:
                          row.status === "Open"
                              ? "#F0F1FA"
                              : row.status === "Paid"
                              ? "#E1FCEF"
                              : row.status === "Inactive"
                              ? "#E9EDF5"
                              : "#FAF0F3",
                          color:
                          row.status === "Open"
                              ? "#4F5AED"
                              : row.status === "Paid"
                              ? "#14804A"
                              : row.status === "Inactive"
                              ? "#5A6376"
                              : "#D12953",
                        }}
                      >
                        {row.status}
                      </span>
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="16px"
                      sx={{ fontSize: "14px", color: "#464F60" }}
                    >
                      {row.rate}
                      <p style={{ fontSize: "12px", color: "#687182" }}>VND</p>
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="16px"
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        sx={{
                          color: row.balance.includes("-")
                            ? "#D12953"
                            : "#14804A",
                        }}
                      >
                        {row.balance}
                      </Box>
                      <p style={{ fontSize: "12px", color: "#687182" }}>VND</p>
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="16px"
                    >
                      <Box display="flex" alignItems="center">
                        {row.deposite}
                      </Box>
                      <p style={{ fontSize: "12px", color: "#687182" }}>VND</p>
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="16px"
                    >
                      <Box display="flex" alignItems="center">
                        <ModalPopup employee={row} />
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={employeeData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

CustomerList.propTypes = {
  employees: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};
