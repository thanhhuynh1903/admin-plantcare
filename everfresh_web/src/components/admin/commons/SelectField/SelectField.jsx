import React, { useEffect } from "react";
import { MenuItem, Select } from "@mui/material";
import "./SelectField.scss";

export default function SelectField({
  className,
  menuItemClassName,
  sx = {},
  prop = "",
  items = [],
  defaultLabel = "Please select...",
  ...props
}) {
  useEffect(() => {}, [prop]);

  return (
    <Select
      displayEmpty
      className={`common-select-field ${className}`}
      id="outlined-basic"
      variant="outlined"
      sx={{ width: "100%", ...sx }}
      value={prop}
      {...props}
    >
      <MenuItem className={menuItemClassName} value="">
        <em style={{color: '#9D9D9D', fontStyle: 'italic'}}>{defaultLabel}</em>
      </MenuItem>
      {items.map((item, i) => (
        <MenuItem className={menuItemClassName} key={i} value={item.prop}>
          {item.value}
        </MenuItem>
      ))}
    </Select>
  );
}
