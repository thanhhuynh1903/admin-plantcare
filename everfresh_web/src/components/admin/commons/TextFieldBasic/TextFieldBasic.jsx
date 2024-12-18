import React from 'react';
import TextField from '@mui/material/TextField';
import './TextFieldBasic.scss';

export default function TextFieldBasic({ placeholder = "Enter text here", sx = {}, multiline, ...props }) {
  return (
    <TextField
      className="common-text-field-basic"
      id="outlined-basic"
      label={props?.label}
      variant="outlined"
      multiline={multiline}
      placeholder={placeholder}
      sx={{ width: '100%', ...sx }}
      {...props}
    />
  );
};
