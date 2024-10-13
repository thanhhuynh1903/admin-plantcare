import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import BusAlertOutlinedIcon from '@mui/icons-material/BusAlertOutlined';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';

const IconContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const IconWrapper = styled('div')({
  width: 100,
  height: 100,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '20%',
  background: 'linear-gradient(90deg, #98FB98 0%, #00FA9A 100%)',
  color: '#fff',
});

function NoteOrderStatus({status}) {
  return (
    <IconContainer>
    {status === "Delivered" ?
      <IconWrapper>
        <LocalShippingOutlinedIcon sx={{fontSize:'48px'}}/>
      </IconWrapper>
      :
    status === "Confirmed" ?
      <IconWrapper style={{background:'#ff9a00'}}>
        <PublishedWithChangesOutlinedIcon sx={{fontSize:'48px'}}/>
      </IconWrapper>
      :
      <IconWrapper style={{background:'linear-gradient(102.2deg, rgb(250, 45, 66) 9.6%, rgb(245, 104, 104) 96.1%)'}}>
        <BusAlertOutlinedIcon sx={{fontSize:'45px'}}/>
      </IconWrapper>
}
    </IconContainer>
  );
}

export default NoteOrderStatus;
