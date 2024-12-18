import React from 'react';
import './SwitchBasic.scss';
import { Switch } from '@mui/material';

export default function SwitchBasic({ ...props }) {
  return (
    <Switch
    className='common-switch-basic'
      {...props}
    />
  );
};
