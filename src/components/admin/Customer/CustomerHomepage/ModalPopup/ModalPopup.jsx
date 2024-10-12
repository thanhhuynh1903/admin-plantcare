import React, { useState, useEffect } from "react";
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
import ModalDelete from "../../ModalDelete/ModalDelete";
import { apatch } from "../../../../utils/util_axios";
import { adelete } from "../../../../utils/util_axios";
const ModalPopup = ({ employee ,onUpdate }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [employeeStatus, setEmployeeStatus] = useState(employee.status);

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


  
  const handleStatusChange = async () => {
    try {
      const response = await apatch(
        `/users/banAccountByAdmin/${employee._id}`);
      setEmployeeStatus(response.data.status);

    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      // Replace with your actual delete API call
      console.log(employee._id);
     await adelete(`/users/${employee._id}`)
      handleCloseDelete();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton
        onClick={handleClick}
        sx={{ padding: "0px", zIndex: open ? 10 : 4 }}
      >
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
        sx={{ left: "-90px", top: "-5px", zIndex: 5 }}
      >
        <Box sx={{ p: 2, width: "150px !important" }}>
          <Typography
            onClick={handleOpenModal}
            sx={{ cursor: "pointer", mb: 1 }}
          >
            <Link to={`/customers/edit/${employee._id}`} className="edit-link">
              View Profile
            </Link>
          </Typography>
          <Typography
            onClick={handleStatusChange}
            sx={{ cursor: "pointer", mb: 1 }}
          >
            {employeeStatus ? "Deactivate User" : "Activate User"}
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
      <Modal open={openDelete} onClose={handleCloseDelete}>
        <ModalDelete open={openDelete} onClose={handleCloseDelete} onDelete={handleDeleteUser}/>
      </Modal>
    </div>
  );
};

export default ModalPopup;
