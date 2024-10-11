import React, { useEffect } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";

export default function FilterPlanters({ data, selectedFilterType, handleChangeFilterType }) {

  const handleChange = (event, newValue) => {
    handleChangeFilterType(newValue);
  };

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
        value={selectedFilterType.id}
        onChange={handleChange}
        aria-label="order status tabs"
      >
        <Tab value={0} label="All" />
        <Tab value={1} label="In stock" />
        <Tab value={2} label="Out of stock" />
        <Tab value={3} label="Unknown" />
      </Tabs>
      <Typography
        variant="body2"
        style={{ marginRight: "16px", color: "#6E6893" }}
      >
        Total planters payable amount:{" "}
        <span
          style={{ color: "#009e71", fontSize: "20px", fontWeight: "bold" }}
        >
          {data.reduce((acc, cur) => acc + cur.price, 0)}
        </span>{" "}
        <span style={{ fontSize: "20px" }}>VND</span>
      </Typography>
    </Box>
  );
}
