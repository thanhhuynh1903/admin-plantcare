import React, { useEffect } from 'react';
import { MenuItem, Select } from '@mui/material';
import './SelectField.scss';

export default function SelectField({ sx = {}, prop, items = [], ...props }) {

  //Items have the following structure: {prop: "", value: ""}

  useEffect(() => {

  }, [prop]);

  return (
    <Select
      className="common-select-field"
      id="outlined-basic"
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
