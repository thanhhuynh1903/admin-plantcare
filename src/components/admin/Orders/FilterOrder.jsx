import React from 'react';
import { Tabs, Tab, Typography, Box } from '@mui/material';

const FilterOrder = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" borderBottom={1} borderColor="divider" sx={{marginY:"20px"}}>
      <Tabs value={value} onChange={handleChange} aria-label="order status tabs" >
        <Tab label="All" />
        <Tab label="Paid" />
        <Tab label="Unpaid" />
        <Tab label="Overdue" />
      </Tabs>
      <Typography variant="body2" style={{ marginRight: '16px' }}>
        Total order status: <span style={{ color: 'green' }}>12 Paid</span>, <span style={{ color: 'orange' }}>2 Unpaid</span>, <span style={{ color: 'red' }}>1 Overdue</span>
      </Typography>
    </Box>
  );
};

export default FilterOrder;
