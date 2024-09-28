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
  TablePagination
} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CircleIcon from '@mui/icons-material/Circle';
import SmartPlanter from "../../../assets/pages/OrderDetail/SmartPlanter.jpg"
import StepperShipping from "./StepperShipping";

const OrderDetail = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const data = [
    {
      id: 1,
      item: "Plant Device",
      date: "14/APR/2020",
      status: "In stock",
      quantity: 1,
      tax: "0 VND",
      price: "55,000 VND",
    },
    {
      id: 2,
      item: "Plant Device",
      date: "14/APR/2020",
      status: "In stock",
      quantity: 1,
      tax: "0 VND",
      price: "75,000 VND",
    },
    // Add more data items here
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ borderRadius: "20px", backgroundColor: "#FFF" }}>
      <Box sx={{ width: "90%", margin: "0 auto", paddingY: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Order detail
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#D9D5EC" }}>
                <TableCell sx={{ color: "#6E6893", fontWeight: "bold",width:"25%" }}>
                  Items
                </TableCell>
                <TableCell sx={{ color: "#6E6893", fontWeight: "bold" }}>
                  Date
                </TableCell>
                <TableCell sx={{ color: "#6E6893", fontWeight: "bold" }}>
                  Status
                </TableCell>
                <TableCell sx={{ color: "#6E6893", fontWeight: "bold" }}>
                  Quantity
                </TableCell>
                <TableCell sx={{ color: "#6E6893", fontWeight: "bold" }}>
                  Tax
                </TableCell>
                <TableCell sx={{ color: "#6E6893", fontWeight: "bold" }}>
                  PRICE
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{display:"flex", textAlign:"center",alignItems:"center",fontSize:"18px",fontWeight:"500"}}>
                    <Checkbox />
                    <img src={SmartPlanter} alt="smart planter" style={{width:"95px", height:"90px",objectFit:"fill"}} />
                    {row.item}
                    <Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{fontSize:"18px",color:"#6E6893"}}>Last update: {row.date}</TableCell>
                  <TableCell >
                    <Box
                      sx={{
                        backgroundColor: "#CDFFCD",
                        color: "#23B000",
                        fontWeight: 600,
                        borderRadius: "20px",
                        width: "90px",
                        paddingX:"6px",
                        paddingY:"3px"
                      }}
                      variant="contained"
                      color="success"
                    >
                      <CircleIcon sx={{color:"#23B000",paddingTop:"5px"}} fontSize="9"/>
                      {row.status}
                    </Box>
                  </TableCell>
                  <TableCell >{row.quantity}</TableCell>
                  <TableCell sx={{fontSize:"18px",color:"#6E6893"}}>{row.tax}</TableCell>
                  <TableCell sx={{fontSize:"18px",color:"#6E6893"}}>{row.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Typography variant="h6" gutterBottom sx={{ mt: 2, textAlign: "end" }}>
          TOTAL PRICE: 130,000 VND
        </Typography>
        <Box component="form" sx={{ mt: 2,mb:4 }}>
          <TextField
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            label="Customer name"
            defaultValue="Nguyen Van Binh"
            fullWidth
            margin="normal"
          />
          <TextField
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            label="Contact Number"
            defaultValue="0937473828"
            fullWidth
            margin="normal"
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Select defaultValue="Mehrab" fullWidth margin="normal">
              <MenuItem value="Mehrab" disabled>Mehrab</MenuItem>
              {/* Add more options here */}
            </Select>
            <Select defaultValue="Bozorgi" fullWidth margin="normal">
              <MenuItem value="Bozorgi">Bozorgi</MenuItem>
              {/* Add more options here */}
            </Select>
          </Box>
          <TextField
            label="Address"
            defaultValue="10/7 nguyen binh , phuong 2"
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
                      '&.Mui-checked': {
                        color: "green",
                      },
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <StepperShipping/>
      </Box>
    </Box>
  );
};

export default OrderDetail;
