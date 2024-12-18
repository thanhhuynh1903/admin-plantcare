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

const FilterModal = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortBy, setSortBy] = useState('Default');
  const [userFilter, setUserFilter] = useState('All');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleUserFilterChange = (value) => {
    setUserFilter(value);
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
            paddingX:"10px",
            boxShadow: '0px 2px 8px rgba(0,0,0,0.15)',
          }
        }}
      >
        <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
          SORT BY:
        </Typography>
        {['Default', 'First Name', 'Last Name', 'Paid', 'Unpaid'].map((option) => (
          <MenuItem key={option} onClick={() => handleSortChange(option)} sx={{justifyContent:"space-between"}}>
             {option}
            <Radio
              checked={sortBy === option}
              size="small"
              sx={{ '& .MuiSvgIcon-root': { fontSize: 20,color:"#6d5bd0" }}}
            />
           
          </MenuItem>
        ))}
        <Divider sx={{ my: 1 }} />
        <Typography variant="subtitle2" sx={{  color: 'text.secondary' }}>
          USERS:
        </Typography>
        {['All', 'Active', 'Inactive'].map((option) => (
          <MenuItem key={option} onClick={() => handleUserFilterChange(option)} sx={{justifyContent:"space-between"}}> 
            {option}
            <Radio
            
              checked={userFilter === option}
              size="small"
              sx={{ '& .MuiSvgIcon-root': { fontSize: 20,color:"#6d5bd0" } }}
            />
           
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default FilterModal;