import React, { useState } from "react";
import {
  Box,
  IconButton,
  Popover,
  Typography,
  Modal,
  Button,
} from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";

const ModalPopupUser = ({ employee }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    handleOpenDelete();
    handleClose();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton onClick={handleClick} sx={{ padding: "0px", zIndex: open ? 10 : 4 }}>
        {open ? <HighlightOffOutlinedIcon /> : <MoreVertIcon />}
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{ left: "-70px", top: "-10px", zIndex: 5 }}
      >
        <Box sx={{ p: 2, width: "150px !important" }}>
          <Typography
            onClick={handleOpenModal}
            sx={{ cursor: "pointer", mb: 1 }}
          >

            <Link className="edit-link">
              Edit
            </Link>
          </Typography>
          <Typography
            onClick={handleOpenModal}
            sx={{ cursor: "pointer", mb: 1 }}
          >
            View Detail
          </Typography>
          <hr style={{ borderColor: "#FFF" }} />
          <Typography
            onClick={handleOpenModal}
            sx={{ cursor: "pointer", color: "red" }}
          >
            Delete
          </Typography>
        </Box>
      </Popover>
      {/* <Modal open={openDelete} onClose={handleCloseDelete}>
      <ModalDelete 
          open={openDelete} 
          onClose={handleCloseDelete} 
        />
      </Modal> */}
    </div>
  );
};

export default ModalPopupUser;
