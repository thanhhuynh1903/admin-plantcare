import React from 'react';
import TextField from '@mui/material/TextField';

const TextFieldBasic = ({ placeholder = "Enter text here", sx = {}, ...props }) => {
  return (
    <TextField
      className="common-text-field-basic"
      id="outlined-basic"
      label="Email"
      variant="outlined"
      placeholder={placeholder}
      sx={{ width: '100%', ...sx }}
      {...props}
    />
  );
};

export default TextFieldBasic;
