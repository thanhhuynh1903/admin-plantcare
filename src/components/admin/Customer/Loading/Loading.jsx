import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex',justifyContent:'center', alignItems:'center' ,width:"100%",height:'50vh' }}>
      <CircularProgress size={100} sx={{ width:"100px",height:'50vh' }}/>
    </Box>
  );
}