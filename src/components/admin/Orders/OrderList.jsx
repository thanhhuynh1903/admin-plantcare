import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterModal from "./FilterModal";
import "./OrderList.scss";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
function createData(id, name, calories, fat, carbs, options) {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    options,
  };
}

const rows = [
  createData(
    1,
    "Cupcake",
    "Active",
    "Paid",
    "200.000",
    <div
      style={{
        zIndex: 10,
        display: "flex",
        width: "100%",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <Typography component={Link} to="/orders/orderdetail" sx={{margin:'auto'}}>
        {" "}
        View more
      </Typography>
      <MoreVertIcon />
    </div>
  ),
  createData(
    2,
    "Cupcake",
    "Inactive",
    "Unpaid",
    "200.000",
    <div
      style={{
        zIndex: 10,
        display: "flex",
        width: "100%",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <Typography component={Link} to="/orders/orderdetail" sx={{margin:'auto'}}>
        {" "}
        View more
      </Typography>
      <MoreVertIcon />
    </div>
  ),
  createData(
    3,
    "Cupcake",
    "Active",
    "Overdue",
    "200.000",
    <div
      style={{
        zIndex: 10,
        display: "flex",
        width: "100%",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <Typography component={Link} to="/orders/orderdetail" sx={{margin:'auto'}}>
        {" "}
        View more
      </Typography>
      <MoreVertIcon />
    </div>
  ),
  createData(
    4,
    "Cupcake",
    "Active",
    "Paid",
    "200.000",
    <div
      style={{
        zIndex: 10,
        display: "flex",
        width: "100%",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <Typography component={Link} to="/orders/orderdetail" sx={{margin:'auto'}}>
        {" "}
        View more
      </Typography>
      <MoreVertIcon />
    </div>
  ),
  createData(
    5,
    "Cupcake",
    "Active",
    "Paid",
    "200.000",
    <div
      style={{
        zIndex: 10,
        display: "flex",
        width: "100%",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <Typography component={Link} to="/orders/orderdetail" sx={{margin:'auto'}}>
        {" "}
        View more
      </Typography>
      <MoreVertIcon />
    </div>
  ),
  createData(
    6,
    "Cupcake",
    "Active",
    "Paid",
    "200.000",
    <div
      style={{
        zIndex: 10,
        display: "flex",
        width: "100%",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <Typography component={Link} to="/orders/orderdetail" sx={{margin:'auto'}}>
        {" "}
        View more
      </Typography>
      <MoreVertIcon />
    </div>
  ),
  createData(
    7,
    "Cupcake",
    "Active",
    "Paid",
    "200.000",
    <div
      style={{
        zIndex: 10,
        display: "flex",
        width: "100%",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <Typography component={Link} to="/orders/orderdetail" sx={{margin:'auto'}}>
        {" "}
        View more
      </Typography>
      <MoreVertIcon />
    </div>
  ),
  createData(
    8,
    "Cupcake",
    "Active",
    "Paid",
    "200.000",
    <div
      style={{
        zIndex: 10,
        display: "flex",
        width: "100%",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <Typography component={Link} to="/orders/orderdetail" sx={{margin:'auto'}}>
        {" "}
        View more
      </Typography>
      <MoreVertIcon />
    </div>
  ),
  createData(
    9,
    "Cupcake",
    "Active",
    "Paid",
    "200.000",
    <div
      style={{
        zIndex: 10,
        display: "flex",
        width: "100%",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <Typography component={Link} to="/orders/orderdetail" sx={{margin:'auto'}}>
        {" "}
        View more
      </Typography>
      <MoreVertIcon />
    </div>
  ),
  createData(
    10,
    "Cupcake",
    "Active",
    "Paid",
    "200.000",
    <div
      style={{
        zIndex: 10,
        display: "flex",
        width: "100%",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <Typography component={Link} to="/orders/orderdetail" sx={{margin:'auto'}}>
        {" "}
        View more
      </Typography>
      <MoreVertIcon />
    </div>
  ),
  createData(
    11,
    "Cupcake",
    "Active",
    "Paid",
    "200.000",
    <div
      style={{
        zIndex: 10,
        display: "flex",
        width: "100%",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <Typography component={Link} to="/orders/orderdetail" sx={{margin:'auto'}}>
        {" "}
        View more
      </Typography>
      <MoreVertIcon />
    </div>
  ),
  createData(
    12,
    "Cupcake",
    "Active",
    "Paid",
    "200.000",
    <div
      style={{
        zIndex: 10,
        display: "flex",
        width: "100%",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <Typography component={Link} to="/orders/orderdetail" sx={{margin:'auto'}}>
        {" "}
        View more
      </Typography>
      <MoreVertIcon />
    </div>
  ),
  createData(
    13,
    "Cupcake",
    "Active",
    "Paid",
    "200.000",
    <div
      style={{
        zIndex: 10,
        display: "flex",
        width: "100%",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <Typography component={Link} to="/orders/orderdetail" sx={{margin:'auto'}}>
        {" "}
        View more
      </Typography>
      <MoreVertIcon />
    </div>
  ),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "NAME",
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "STATUS",
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "PAYMENT STATUS",
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "PRICE",
  },
  {
    id: "options",
    numeric: true,
    disablePadding: false,
    label: <MoreVertIcon />,
  },
];

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
        <TableCell padding="checkbox" sx={{ backgroundColor: "#f4f2ff" }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ backgroundColor: "#f4f2ff", color: "#6E6893" }}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
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
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Box>
          <Tooltip title="Filter list">
            <IconButton
              sx={{
                paddingX: "10px",
                paddingY: "15px",
                borderColor: "#C6C2DE",
                borderRadius: "10px",
              }}
            >
              <FilterModal />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ display: "flex", width: "100%", justifyContent: "end" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          <Box
            sx={{
              marginRight: "20px",
              fontSize: "15px",
              background: "#009e71",
              fontWeight: "bold",
              color: "#FFF",
              paddingX: "8px",
              paddingY: "10px",
              borderRadius: "10px",
            }}
          >
            PAY DUES
          </Box>
        </Typography>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function OrderList() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  );

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
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer", zIndex: 5 }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right">
                      <span
                        style={{
                          display: "inline-block",
                          fontSize: "14px",
                          padding: "3px 10px",
                          borderRadius: "15px",
                          backgroundColor:
                            row.calories === "Active"
                              ? "#F0F1FA"
                              : row.calories === "Inactive"
                              ? "#E9EDF5"
                              : "#FAF0F3",
                          color:
                            row.calories === "Active"
                              ? "#4F5AED"
                              : row.calories === "Inactive"
                              ? "#5A6376"
                              : "#D12953",
                        }}
                      >
                        <CircleRoundedIcon
                          sx={{ marginTop: "5px", fontSize: "10px" }}
                        />{" "}
                        {row.calories}
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      <span
                        style={{
                          display: "inline-block",
                          fontSize: "14px",
                          padding: "3px 10px",
                          borderRadius: "15px",
                          backgroundColor:
                            row.fat === "Paid"
                              ? "#CDFFCD"
                              : row.fat === "Unpaid"
                              ? "#FFECCC"
                              : "#FFE0E0",

                          color:
                            row.fat === "Paid"
                              ? "#007F00"
                              : row.fat === "Unpaid"
                              ? "#CE8500"
                              : "#D12953",
                        }}
                      >
                        <CircleRoundedIcon
                          sx={{ marginTop: "5px", fontSize: "10px" }}
                        />{" "}
                        {row.fat}
                      </span>
                    </TableCell>
                    <TableCell align="right" sx={{fontWeight:'bold'}}>{row.carbs} <br/> <p style={{fontSize:'12px', fontWeight:'bold',opacity:'0.5'}}>VND</p></TableCell>
                    <TableCell align="right">
                      {row.options}  
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ backgroundColor: "#f4f2ff" }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
