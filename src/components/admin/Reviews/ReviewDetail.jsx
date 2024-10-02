import React from 'react';
import { Box, Card, CardContent, Typography, Avatar, Rating, Button, Grid, Modal } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CardReview from './CardReview';
import SmartPlanter from "../../../assets/pages/OrderDetail/SmartPlanter.jpg";
import ModalReport from './ModalReport';
import { useState } from 'react';
const ReviewDetail = () => {
    const [open, setOpen] = useState(false);
    const [reportedItem, setReportedItem] = useState('Rating #1');
    const [reportedUser, setReportedUser] = useState('John A.');
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', borderRadius: '20px !important' }}>
      <Card sx={{ padding: 3, borderRadius: '20px !important' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: 'red', mr: 2 ,width: 60, height: 60}}  >JA</Avatar>
            <Box sx={{ display: 'block' }}>
              <Typography variant="subtitle1">#30</Typography>
              <Typography variant="subtitle1" sx={{fontSize:'18px',fontWeight:'bold'}}>John A.</Typography>
              <div style={{height:'50px',width:'100%',display:'flex',flexDirection:'column'}}>
                <Rating value={5} readOnly size="large" />
                <Typography variant="caption" sx={{textAlign:'start',paddingLeft:1}}>25/06/2024</Typography>
              </div>
            </Box>
            <Box sx={{ ml: 'auto' }}>
              <Button startIcon={<WarningIcon />} color="error" onClick={handleOpen}>
                Report this rating
              </Button>
            </Box>
          </Box>
          <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '21px', color: '#464255', fontWeight: 650 }}>
            Rating post
          </Typography>
          <Typography variant="body1" paragraph>
            Thanks for the plant! The delivery was fairly prompt but could be improved for faster service, and although customer support was helpful, there were minor delays in responding to my inquiries. Overall, it was a positive experience, but there's room for improvement in these areas.
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '21px', color: '#464255', fontWeight: 650 }}>Involved product</Typography>
          <Box>
            <CardReview />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '21px', color: '#464255', fontWeight: 650 }}>Rating specification</Typography>
            <Box container spacing={2}>
              {['Appearance', 'Service', 'Delivery time', 'Packaging', 'Value'].map((item) => (
                <Box item sx={{ display: 'flex', width: '25%', justifyContent: 'space-between' }} key={item}>
                  <Typography variant="body2" sx={{ fontSize: '15px' }}>{item}</Typography>
                  <Rating value={5} readOnly size="medium" sx={{ textAlign: 'end' }} />
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '21px', color: '#464255', fontWeight: 650 }}>Images, medias</Typography>
            <Grid container spacing={2} >
              {[1, 2, 3, 4].map((item) => (
                <Grid item xs={3} key={item} sx={{maxWidth:'15% !important',}}>
                  <img src={SmartPlanter} alt={`Product ${item}`} style={{ width: '150px', height: '150px', borderRadius: '8px' }} />
                </Grid>
              ))}
              <Grid item xs={3}>
                <Box sx={{ bgcolor: '#f5f5f5', width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>
                  <Typography>+4</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      <Modal open={open} onClose={handleClose}>
      <ModalReport 
          open={open} 
          onClose={handleClose} 
          reportedItem={reportedItem} 
          reportedUser={reportedUser} 
        />
      </Modal>
    </Box>
  );
};

export default ReviewDetail;
