import React from 'react';
import { Card, CardContent, Typography, Avatar, Box, Rating } from '@mui/material';

const ReviewCard = ({ review }) => {
  return (
    <Card variant="outlined"  sx={{minWidth:"275px !important", boxShadow:"rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
      <CardContent>
        <Box sx={{height:"200px"}}>
        <Box display="flex" alignItems="center" sx={{width:"100%"}}>
          <Avatar alt={review.author} src={review.avatar} sx={{ marginRight: 2 }} />
          <Box sx={{width:"100%"}}>
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <Typography variant="h6" style={{fontSize:"14px"}}>{review.author}</Typography>
             <Typography variant="body2" color="#565656" style={{fontSize:"14px"}}>{review.date}</Typography>
            </div>
            <Rating sx={{fontSize:'15px'}} value={review.rating} readOnly />
            <Typography variant="body2" color="textSecondary" style={{fontSize:"12px",textDecoration:"underline"}}>Product: {review.product}</Typography>
            <Typography variant="body2" color="textSecondary" style={{fontSize:"12px"}}>Plant name: {review.plant_name}</Typography>
          </Box>
        </Box>
        <Typography variant="body1" mt={2} style={{fontSize:"11.5px"}}>
          {review.text}
        </Typography>
       </Box>
       <Typography variant="body1" mt={2} style={{fontSize:"11.5px",cursor:"pointer",textAlign:"end",textDecoration:"underline",color:"#989898"}}>
          {">>"} View more 
        </Typography>
      </CardContent>

    </Card>
  );
};

export default ReviewCard;
