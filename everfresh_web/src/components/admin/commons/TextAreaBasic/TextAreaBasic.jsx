import React from 'react';
import TextField from '@mui/material/TextField';
import './TextAreaBasic.scss';
import { TextareaAutosize } from '@mui/material';

export default function TextAreaBasic({ placeholder = "Enter text here", sx = {}, multiline, ...props }) {
  return (
    <TextareaAutosize
      className="common-text-area-basic"
      id="outlined-basic"
      minRows={3}
      label={props?.label}
      placeholder={placeholder}
      sx={{ width: '100%', ...sx }}
      {...props}
    />
  );
};
