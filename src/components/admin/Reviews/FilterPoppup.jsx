import React, { useState } from 'react';
import { 
  Box,
  Button,
  Menu,
  MenuItem,
  Radio,
  Typography,
  Divider
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const FilterPoppup = ({ setSortBy }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortBy, setSortByState] = useState('Default');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (value) => {
    setSortByState(value);
    setSortBy(value);
    handleClose();
  };

  return (
    <Box>
      <Button
        startIcon={<FilterAltIcon />}
        onClick={handleClick}
        sx={{ color: 'green', textTransform: 'none' }}
      >
        Filter
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: '254px',
            paddingX: "10px",
            boxShadow: '0px 2px 8px rgba(0,0,0,0.15)',
          }
        }}
      >
        <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
          SORT BY:
        </Typography>
        {['Default', 'Name', 'Plant Name', 'Product'].map((option) => (
          <MenuItem key={option} onClick={() => handleSortChange(option)} sx={{ justifyContent: "space-between" }}>
            {option}
            <Radio
              checked={sortBy === option}
              size="small"
              sx={{ '& .MuiSvgIcon-root': { fontSize: 20, color: "#6d5bd0" } }}
            />
          </MenuItem>
        ))}
        <Divider sx={{ my: 1 }} />
      </Menu>
    </Box>
  );
};

export default FilterPoppup;
