import React from 'react';
import { Tabs, Tab, Typography, Box } from '@mui/material';

const FilterProduct = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" borderBottom={1} borderColor="divider" sx={{marginY:"20px"}}>
      <Tabs value={value} onChange={handleChange} aria-label="order status tabs" >
        <Tab label="All" />
        <Tab label="Instock" />
        <Tab label="Outstack" />
        <Tab label="Pending" />
      </Tabs>
      <Typography variant="body2" style={{ marginRight: '16px',color:'#6E6893' }}>
      Total products payable amount: <span style={{ color: '#009e71',fontSize:'20px',fontWeight:'bold' }}>$900.00</span> <span style={{fontSize:'20px' }}>USD</span></Typography>
    </Box>
  );
};

export default FilterProduct;
