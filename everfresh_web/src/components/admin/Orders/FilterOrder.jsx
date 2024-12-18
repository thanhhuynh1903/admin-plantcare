import React from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";

export default function FilterOrder({ filteredOrders, filterType = 1, filterTypes = [], applyFilter }) {

  const handleChange = (event, newValue) => {
    applyFilter(newValue);
  };

  const delivered = filteredOrders.filter((order) => order.status === "Delivered").length;
  const confirmed = filteredOrders.filter((order) => order.status === "Confirmed").length;
  const failedDelivery = filteredOrders.filter((order) => order.status === "Failed Delivery").length;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderBottom={1}
      borderColor="divider"
      sx={{ marginY: "20px" }}
    >
      <Tabs
        value={filterType}
        onChange={handleChange}
        aria-label="order status tabs"
      >
        {filterTypes.map((type) => (
          <Tab key={type.id} value={type.id} label={type.name} />
        ))}
      </Tabs>
      <Typography variant="body2" style={{ marginRight: "16px" }}>
        Total order status: <span style={{ color: "green" }}>{delivered} Delivered</span>,{" "}
        <span style={{ color: "orange" }}>{confirmed} Confirmed</span>,{" "}
        <span style={{ color: "red" }}>{failedDelivery} Failed Delivery</span>
      </Typography>
    </Box>
  );
}


