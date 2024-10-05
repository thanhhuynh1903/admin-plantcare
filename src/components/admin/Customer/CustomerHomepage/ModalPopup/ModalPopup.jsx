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

const ModalPopup = ({ employee }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    handleClose();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton onClick={handleClick} sx={{ padding: "0px", zIndex: 10 }}>
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
            {/* <TableCell>
                      <IconButton
                        onClick={() => props.onDelete(employee.id)}
                        className="delete-icon"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell> */}
            <Link to={`/customers/edit/${employee.id}`} className="edit-link">
              View Profile
            </Link>
          </Typography>
          <Typography
            onClick={handleOpenModal}
            sx={{ cursor: "pointer", mb: 1 }}
          >
            Activate User
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
    </div>
  );
};

export default ModalPopup;
