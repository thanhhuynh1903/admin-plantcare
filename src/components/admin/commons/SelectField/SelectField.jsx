import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { MenuItem, Select } from '@mui/material';

export default function SelectField({ sx = {}, prop, items = [], ...props }) {

  useEffect(() => {

  }, [prop]);

  return (
    <Select
      className="common-select-field"
      id="outlined-basic"
      label={props?.label}
      variant="outlined"
      sx={{ width: '100%', ...sx }}
      value={prop}
      {...props}
    >
      {
        items.map((item, i) => (
          <MenuItem key={i} value={item.prop}>{item.value}</MenuItem>
        ))
      }
    </Select>
  );
};
