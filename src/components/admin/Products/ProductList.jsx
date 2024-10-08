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
import "./ProductList.scss";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import ModalPopupUser from "./ModalPopupUser/ModalPopupUser";

function createData(id, name, calories, fat, carbs, protein, options) {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
    options,
  };
}

const rows = [
  createData(1, "Croton Petra", "Plant tech", "200.000", "Instock", 100),
  createData(
    2,
    "Watermelon Peperomia",
    "Plant health",
    "200.000",
    "Instock",
    1
  ),
  createData(3, "Bird’s Nest Fern", "Good Tech", "200.000", "Instock", 23),
  createData(4, "Willow", "Chip plant", "200.000", "Censoring", 123),
  createData(5, "Peperomia", "Hight Tech", "200.000", "Outstock", 1200),
  createData(6, "Cedar ", "Technology", "200.000", "Outstock", 50),
  createData(7, "Plant tech", "Technology", "200.000", "Censoring", 100),
  createData(8, "Plant recovery", "Chip plant", "200.000", "Censoring", 0),
  createData(9, "Beech", "Plant emotion", "200.000", "Instock", 0),
  createData(10, "Pineoach", "Plant heart", "200.000", "Instock", ""),
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
    label: "BRAND",
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "PRICE",
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "STATUS",
  },

  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Quantity",
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

// // function EnhancedTableToolbar(props) {
// //   const { numSelected } = props;
// //   return (
// //     <Toolbar
// //       sx={[
// //         {
// //           pl: { sm: 2 },
// //           pr: { xs: 1, sm: 1 },
// //         },
// //         numSelected > 0 && {
// //           bgcolor: (theme) =>
// //             alpha(
// //               theme.palette.primary.main,
// //               theme.palette.action.activatedOpacity
// //             ),
// //         },
// //       ]}
// //     >
// //       {numSelected > 0 ? (
// //         <Tooltip title="Delete">
// //           <IconButton>
// //             <DeleteIcon />
// //           </IconButton>
// //         </Tooltip>
// //       ) : (
// //         <Box>
// //           <Tooltip title="Filter list">
// //             <IconButton
// //               sx={{
// //                 paddingX: "10px",
// //                 paddingY: "15px",
// //                 borderColor: "#C6C2DE",
// //                 borderRadius: "10px",
// //               }}
// //             >

// //             </IconButton>
// //           </Tooltip>
// //         </Box>
// //       )}

// //       {numSelected > 0 ? (
// //         <Typography
// //           sx={{ flex: "1 1 100%" }}
// //           color="inherit"
// //           variant="subtitle1"
// //           component="div"
// //         >
// //           {numSelected} selected
// //         </Typography>
// //       ) : (
// //         <Typography
// //           sx={{ display: "flex", width: "100%", justifyContent: "end" }}
// //           variant="h6"
// //           id="tableTitle"
// //           component="div"
// //         >
// //           <Box
// //             sx={{
// //               marginRight: "20px",
// //               fontSize: "15px",
// //               background: "#009e71",
// //               fontWeight: "bold",
// //               color: "#FFF",
// //               paddingX: "8px",
// //               paddingY: "10px",
// //               borderRadius: "10px",
// //             }}
// //           >
// //             PAY DUES
// //           </Box>
// //         </Typography>
// //       )}
// //     </Toolbar>
// //   );
// // }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

export default function ProductList() {
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
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
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
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      {row.fat} <br />{" "}
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          opacity: "0.5",
                        }}
                      >
                        VND
                      </p>
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      <span
                        style={{
                          display: "inline-block",
                          fontSize: "14px",
                          padding: "3px 10px",
                          borderRadius: "15px",
                          backgroundColor:
                            row.carbs === "Instock"
                              ? "#CDFFCD"
                              : row.carbs === "Censoring"
                              ? "#E6E6F2"
                              : "#FFECCC",

                          color:
                            row.carbs === "Instock"
                              ? "#007F00"
                              : row.carbs === "Censoring"
                              ? "#4A4AFF"
                              : "#965E00",
                        }}
                      >
                        <CircleRoundedIcon
                          sx={{ marginTop: "5px", fontSize: "10px" }}
                        />{" "}
                        {row.carbs}
                      </span>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 600,
                        color:
                          row.protein > 0
                            ? "#3C7D0E"
                            : row.protein === 0
                            ? "#FF3C21"
                            : "#4A4AFF",
                      }}
                    >
                      {row.protein === "" || isNaN(row.protein)
                        ? "Pending"
                        : row.protein}
                    </TableCell>
                    <TableCell align="right">
                      <ModalPopupUser />
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
