import React from "react";
import { Box, Fab, Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { styled } from "@mui/system";
import "./FloatingActionButton.scss";
import PublishedWithChangesOutlinedIcon from "@mui/icons-material/PublishedWithChangesOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import BusAlertOutlinedIcon from "@mui/icons-material/BusAlertOutlined";
import ProductionQuantityLimitsOutlinedIcon from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { aupdate } from "../../utils/util_axios";

const FloatingContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  width: "max-content",
  height: "45px",
  bottom: "0",
  right: "0",
  margin: "35px 25px",
  "&:hover": {
    height: "370px",
  },
  "&:hover .floating-button": {
    boxShadow: "0 10px 25px rgba(44, 179, 240, 0.6)",
    transform: "translateY(5px)",
    transition: "all 0.3s",
  },
  "&:hover .element-container .float-element:nth-of-type(1)": {
    animation: "come-in 0.4s forwards 0.2s",
  },
  "&:hover .element-container .float-element:nth-of-type(2)": {
    animation: "come-in 0.4s forwards 0.4s",
  },
  "&:hover .element-container .float-element:nth-of-type(3)": {
    animation: "come-in 0.4s forwards 0.6s",
  },
  "&:hover .element-container .float-element:nth-of-type(4)": {
    animation: "come-in 0.4s forwards 0.8s",
  },
  "&:hover .element-container .float-element:nth-of-type(5)": {
    animation: "come-in 0.4s forwards 1s",
  },
}));

const FloatingButton = styled(Fab)(({ theme }) => ({
  position: "absolute",
  width: "45px",
  height: "45px",
  background: "#2cb3f0",
  bottom: "0",
  borderRadius: "50%",
  left: "0",
  right: "0",
  margin: "auto",
  color: "white",
  textAlign: "center",
  fontSize: "23px",
  zIndex: "100",
  boxShadow: "0 10px 25px -5px rgba(44, 179, 240, 0.6)",
  cursor: "pointer",
  transition: "all 0.3s",
}));

const FloatElement = styled(Fab)(({ theme }) => ({
  position: "relative",
  display: "block",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  margin: "15px 0px",
  color: "white",
  textAlign: "center",
  lineHeight: "50px",
  zIndex: "0",
  opacity: "0",
  transform: "translateY(100px)",
}));

const FloatingActionButtons = ({ status }) => {
  const handleUpdateStatus = async () => {
    await aupdate(`/orders/changeStatus/${status?._id}`).then((res) => {
      console.log(res.data);
      window.location.reload(); // Reload the page after status update
    });
  };

  const handleUpdateFailedStatus = async () => {
    await aupdate(`/orders/changeStatusToFailedDelivery/${status?._id}`).then((res) => {
      console.log(res.data);
      window.location.reload(); // Reload the page after status update
    });
  };

  const steps = [
    { key: "confirmed", icon: <PublishedWithChangesOutlinedIcon sx={{marginTop:"12px"}}/>, color: "warning", backgroundColor: "#FF9800", title: "Confirmed" },
    { key: "shipped", icon: <Inventory2OutlinedIcon sx={{marginTop:"15px"}}/>, color: "success", backgroundColor: "#024CAA", title: "Shipped" },
    { key: "out_of_delivery", icon: <ProductionQuantityLimitsOutlinedIcon sx={{marginTop:"12px"}}/>, color: "error", backgroundColor: "#798645", title: "Out of delivery" },
    { key: "delivered", icon: <LocalShippingOutlinedIcon sx={{marginTop:"15px"}}/>, color: "success", backgroundColor: "#4CAF50", title: "Delivered" },
  ];

  const currentStep = status?.tracking_status_dates.length || 0;
  const maxStep = 4;

  return (
    <FloatingContainer>
      <FloatingButton className="floating-button">
        <EditOutlinedIcon />
      </FloatingButton>
      <Box className="element-container">
        {steps.slice(0, currentStep + 1).map((step, index) => (
          <Tooltip key={index} title={step.title} placement="left">
            <FloatElement
              color={step.color}
              className="float-element"
              sx={{
                backgroundColor: step.backgroundColor,
                boxShadow: `0 20px 20px -10px rgba(${step.color === "error" ? "244, 67, 54" : step.color === "success" ? "76, 175, 80" : "255, 152, 0"}, 0.5)`,
              }}
              onClick={handleUpdateStatus}
            >
              {step.icon}
            </FloatElement>
          </Tooltip>
        ))}
         <Tooltip title="Failed to delivery" placement="left">
          <FloatElement
            color="error"
            className="float-element"
            sx={{
              backgroundColor: "red",
              boxShadow: "0 20px 20px -10px rgba(66, 165, 245, 0.5)",
            }}
            onClick={handleUpdateFailedStatus}
          >
            <BusAlertOutlinedIcon sx={{ marginTop: "12px" }}/>
          </FloatElement>
        </Tooltip>
      </Box>
    </FloatingContainer>
  );
};

export default FloatingActionButtons;
