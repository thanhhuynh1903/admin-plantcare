import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import WarningIcon from "@mui/icons-material/Warning";

const ModalReport = ({ open, onClose, reportedItem, reportedUser }) => {
  const [confirmDeletion, setConfirmDeletion] = useState(false);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width:'100%',
            mb: 2,
            
            color: "#333",
          }}
        >
            <div style={{display:'flex',width:'95%',justifyContent:'center'}}>
          <Box
            sx={{
              backgroundColor: "#FFF",
              marginX: "5px",
              paddingY: "7px",
              paddingX: "10px",
              border: "1px solid #E0E0E0",
              borderRadius: "10px",

            }}
          >
            <WarningIcon color="error" />
          </Box>
           </div>
           <div style={{display:'flex',width:'5%',justifyContent:'center'}}>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
         </div>
        </Box>
        <Typography variant="h6" component="h2" color="#101828" sx={{mb:1,fontSize:'15.5px',fontWeight:'bold',textAlign:'center'}}>
          Report rating violations
        </Typography>
        <Typography variant="body2" sx={{ mb: 2,fontSize:'14px', color:'#475467',textAlign:'center' }}>
          You are about to report rating violations
        </Typography>

        <Typography variant="subtitle2" sx={{ mb: 1,fontSize:'15px', color:'#475467',textAlign:'start',fontWeight:'bold' }}>
          Reported item:
        </Typography>
        <Typography variant="body1" sx={{fontSize:'18px', color:'black',fontWeight:'bold' }}>
          Rating #1
        </Typography>

        <Typography variant="subtitle2" sx={{ mt: 2,mb:1 ,color:'black',}}>
          Reported user:
        </Typography>
        <TextField
        fullWidth
          variant="outlined"
          size="small"
          value="John David"
          sx={{ mb: 2 }}
        />

        <Typography variant="subtitle2"sx={{ mt: 2,mb:1 ,color:'black',}}>
          Reason for report:
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={confirmDeletion}
              onChange={(e) => setConfirmDeletion(e.target.checked)}
            />
          }
          label="Confirm deletion"
          sx={{ mb: 2 ,color:'gray'}}
        />

        <Button fullWidth variant="contained" color="error" sx={{ mb: 1 }}>
          Accept
        </Button>

        <Button fullWidth variant="outlined" sx={{ mb: 1 }} onClick={onClose}>
          Decline
        </Button>

        <Button fullWidth variant="text" startIcon={<RefreshIcon />}>
          Try archiving page instead
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalReport;
